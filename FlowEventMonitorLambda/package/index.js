require("dotenv").config();
const fcl = require("@onflow/fcl");
const sdk = require("@onflow/sdk");
const { config } = fcl;
const {
  batchWriteListings,
  batchDeleteListings,
} = require("./ListingsTableService");
const { batch, deduplicateArrays, listingParser } = require("./utils");
const { getEvents } = require("./QueryEventsService");

const FlowEventMonitor = async (event) => {
  await config().put("accessNode.api", "https://access-testnet.onflow.org");
  const eventsArray = [process.env.LISTING_AVAILABLE];
  console.log(`eventsArray to search: ${eventsArray}`);
  try {
    // Get the events from Flow
    const eventObjects = await getEvents(eventsArray);
    // TODO: Change rawCompletedEvents to Listing_Complete
    const rawCreatedEvents = eventObjects.filter(
      (e) => e.eventName === process.env.LISTING_AVAILABLE
    )[0];
    // const rawCompletedEvents = eventObjects.filter(
    //   (e) => e.eventName === process.env.FUSD_WITHDRAWN
    // )[0];
    // Need to flatten the array as the events are grouped by block, we don't care about this.
    const createdListingEvents = rawCreatedEvents.events
      .flat()
      .map((e) => listingParser(e));
    console.log(
      `createdListingEvents: ${JSON.stringify(createdListingEvents)}`
    );
    console.log(`rCE: ${JSON.stringify(rawCreatedEvents)}`);
    console.log(`rCE_E: ${JSON.stringify(rawCreatedEvents.events)}`);
    // const completedListingEvents = rawCompletedEvents.events
    //   .flat()
    //   .map((e) => listingParser(e));
    // console.log(
    //   `completedListingEvents: ${JSON.stringify(createdListingEvents)}`
    // );
    return;

    // Diff the events to remove duplicates from each array
    // const [createEvents, deleteEvents] = deduplicateArrays(
    //   createdListingEvents,
    //   completedListingEvents
    // );
    // console.log(`cE: ${createdEvents}, dE: ${deletedEvents}`);
    if (createdEvents.length == 0 && deletedEvents.length == 0) {
      console.log(`FINISHED`);
      return;
    }
    if (createdEvents.length) {
      //  Batch them up as dDB can only batch write 25 requests at a time. batch() returns a 2D array
      const batchedEvents = batch(createdEvents, 25);
      // console.log(`BatchedEvents: ${JSON.stringify(batchedEvents)}`);

      // Then loop through each nested array of 25 events
      for (var i = 0; i < batchedEvents.length; i++) {
        await batchWriteListings(batchedEvents[i]);
      }
    }

    //  Repeat for delete
    if (deletedEvents.length) {
      const batchedEvents = batch(deletedEvents, 25);
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
