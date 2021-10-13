// TODO: Remove console.log calls

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

const d = async (event) => {
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
    const rawCreatedEvents = eventObjects.find(
      (e) => e.eventName === process.env.LISTING_AVAILABLE
    );
    // Select only the LISTING_COMPLETED events
    const rawCompletedEvents = eventObjects.find(
      (e) => e.eventName === process.env.LISTING_COMPLETED
    );
    // Need to flatten the array as the events are grouped into arrays by block, we don't care about this.
    // Also parse them into a shape that we can write to dDB
    const createdListingEvents = rawCreatedEvents.events
      .flat()
      .map((e) => createdListingParser(e));
    const completedListingEvents = rawCompletedEvents.events
      .flat()
      .map((e) => completedListingParser(e));

    // Diff the events to remove duplicates from each array
    const [createEvents, deleteEvents] = deduplicateArrays(
      createdListingEvents,
      completedListingEvents
    );
    console.log(`cE: ${createEvents}, dE: ${deleteEvents}`);
    if (createEvents.length == 0 && deleteEvents.length == 0) {
      console.log(`FINISHED`);
      return;
    }
    if (createEvents.length) {
      //  Batch them up as dDB can only batch write 25 requests at a time. batch() returns a 2D array
      const batchedEvents = batch(createEvents, 25);
      // console.log(`BatchedEvents: ${JSON.stringify(batchedEvents)}`);

      // Then loop through each nested array of 25 events
      for (var i = 0; i < batchedEvents.length; i++) {
        await batchWriteListings(batchedEvents[i]);
      }
    }

    //  Repeat for delete
    if (deleteEvents.length) {
      const batchedEvents = batch(deleteEvents, 25);
      // console.log(`BatchedDelEvents: ${JSON.stringify(batchedEvents)}`);
      for (var i = 0; i < batchedEvents.length; i++) {
        await batchDeleteListings(batchedEvents[i]);
      }
    }
    console.log(`FINISHED`);
    return;
  } catch (e) {
    // console.error(
    //   `Error retrieving events for block range fromBlock=${fromBlock} toBlock=${toBlock}`,
    //   e
    // );
    console.log(`Error in main: ${e}`);
    return new Error(`Error in main ${e}`);
  }
};

d()
