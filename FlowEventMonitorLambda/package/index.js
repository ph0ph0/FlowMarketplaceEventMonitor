const fcl = require("@onflow/fcl");
const sdk = require("@onflow/sdk");
const { config } = fcl;
const {
  batchWriteListings,
  batchDeleteListings,
} = require("./ListingsTableService");
const { batch, deduplicateArrays } = require("./utils");
const {
  ListingsAvailableData,
  ListingsCompletedData,
} = require("./QueryEventsService");

const FlowEventMonitor = async (event) => {
  // configure fcl
  await config().put("accessNode.api", process.env.ACCESS_NODE);

  try {
    // Get the events from Flow
    const listingsCreatedEvents = ListingsAvailableData;
    const listingsDeletedEvents = ListingsCompletedData;
    // console.log(`lc: ${listingsCreatedEvents}, lD: ${listingsDeletedEvents}`);
    // Diff the events to remove duplicates from each array
    const [createdEvents, deletedEvents] = deduplicateArrays(
      listingsCreatedEvents,
      listingsDeletedEvents
    );
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
    console.log(`e: ${e}`);
  }
};
FlowEventMonitor();
