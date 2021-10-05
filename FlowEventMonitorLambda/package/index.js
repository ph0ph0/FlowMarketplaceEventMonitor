require("dotenv").config();
const fcl = require("@onflow/fcl");
const { config } = fcl;
const {
  batchWriteListings,
  batchDeleteListings,
} = require("./ListingsTableService");
const {
  batch,
  deduplicateArrays,
  createdListingParser,
  completedListingParser,
} = require("./utils");
const { getEvents } = require("./QueryEventsService");

// Need to figure out how to make this serial and atomic!

const FlowEventMonitor = async (event) => {
  // Configure FCL
  await config().put("accessNode.api", process.env.ACCESS_NODE);
  const eventsArray = [
    process.env.LISTING_AVAILABLE,
    process.env.LISTING_COMPLETED,
  ];
  console.log(`eventsArray to search: ${eventsArray}`);
  try {
    // Get the events from Flow
    const eventObjects = await getEvents(eventsArray);
    // Select only the LISTING_AVAILABLE events
    const rawCreatedEvents = eventObjects.filter(
      (e) => e.eventName === process.env.LISTING_AVAILABLE
    )[0];
    // Select only the LISTING_COMPLETED events
    const rawCompletedEvents = eventObjects.filter(
      (e) => e.eventName === process.env.LISTING_COMPLETED
    )[0];
    // Need to flatten the array as the events are grouped into arrays by block, we don't care about this.
    // Also parse them into a shape that we can write to dDB
    const createdListingEvents = rawCreatedEvents.events
      .flat()
      .map((e) => createdListingParser(e));
    // console.log(
    //   `createdListingEvents: ${JSON.stringify(createdListingEvents)}`
    // );
    // console.log(`rCE: ${JSON.stringify(rawCreatedEvents)}`);
    const completedListingEvents = rawCompletedEvents.events
      .flat()
      .map((e) => completedListingParser(e));
    console.log(
      `completedListingEvents: ${JSON.stringify(createdListingEvents)}`
    );

    // Diff the events to remove duplicates from each array
    // const [createEvents, deleteEvents] = deduplicateArrays(
    //   createdListingEvents,
    //   completedListingEvents
    // );
    // console.log(`cE: ${createdEvents}, dE: ${completedListingEvents}`);
    if (
      createdListingEvents.length == 0 &&
      completedListingEvents.length == 0
    ) {
      console.log(`FINISHED`);
      // RESOLVE
      return;
    }
    if (createdListingEvents.length) {
      //  Batch them up as dDB can only batch write 25 requests at a time. batch() returns a 2D array
      const batchedEvents = batch(createdListingEvents, 25);
      // console.log(`BatchedEvents: ${JSON.stringify(batchedEvents)}`);

      // Then loop through each nested array of 25 events
      for (var i = 0; i < batchedEvents.length; i++) {
        await batchWriteListings(batchedEvents[i]);
      }
    }

    //  Repeat for delete
    if (completedListingEvents.length) {
      const batchedEvents = batch(completedListingEvents, 25);
      // console.log(`BatchedDelEvents: ${JSON.stringify(batchedEvents)}`);
      for (var i = 0; i < batchedEvents.length; i++) {
        await batchDeleteListings(batchedEvents[i]);
      }
    }
    // TODO: Figure out what this means in KI
    // decoded.forEach(async (event) => await this.onEvent(event));
    // // Record the last block that we saw an event for
    // blockCursor = await this.blockCursorService.updateBlockCursorById(
    //   blockCursor.id,
    //   toBlock
    // );

    console.log(`FINISHED`);
  } catch (e) {
    // console.error(
    //   `Error retrieving events for block range fromBlock=${fromBlock} toBlock=${toBlock}`,
    //   e
    // );
    console.log(`Error in main: ${e}`);
  }
};
FlowEventMonitor();
