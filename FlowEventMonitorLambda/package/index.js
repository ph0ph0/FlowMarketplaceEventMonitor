const fcl = require("@onflow/fcl");
const sdk = require("@onflow/sdk")
const { config } = fcl;
const { batchWriteListings, batchDeleteListings } = require("./ListingsTableService")
const { batch, neutraliseObjectArrays } = require("./utils")
const {ListingsAvailableData, ListingsCompletedData} = require("./QueryEventsService")


const FlowEventMonitorLambda = async (event) => {
  // configure fcl
  await config().put("accessNode.api", process.env.ACCESS_NODE);

  try {
    console.log(`1`)
        // Get the events from Flow
        const listingsCreatedEvents = ListingsAvailableData;
        const listingsDeletedEvents = ListingsCompletedData;
        console.log(`lc: ${listingsCreatedEvents}, lD: ${listingsDeletedEvents}`)
        // Diff the events to remove duplicates from each array
         const [createdEvents, deletedEvents] = neutraliseObjectArrays(listingsCreatedEvents, listingsDeletedEvents)
         console.log(`cE: ${createdEvents}, dE: ${deletedEvents}`)
          if (createdEvents.length == 0 && deletedEvents.length == 0) {
            console.log("No events to write/delete, all were neutralised!")
          }
          console.log(`cE: ${createdEvents}, dE: ${deletedEvents}`)
         if (createdEvents.length) {

          //  Batch them up as dDB can only batch write 25 requests at a time. batch() returns a 2D array
          const batchedEvents = batch(createdEvents, 25)
          // console.log(`BatchedEvents: ${JSON.stringify(batchedEvents)}`);

          // Then loop through each nested array of 25 events
          for (var i = 0; i < batchedEvents.length; i++) {
            var batchedObjects = []
            console.log(`3`)
            // And loop through each event within the nested array to convert it to an object
            for (var j = 0; j < batchedEvents[i].length; j++) {
              console.log(`4`)
              const event = batchedEvents[i][j]
              console.log(`Writing item: ${event?.data?.uuid}`)
              var dappyObject = {
                uuid: event?.data?.uuid,
                address: event?.data?.address,
                dna: event?.data?.dna,
                name: event?.data?.name
              }
              console.log(`5`)
              batchedObjects.push(dappyObject)
            }

            // Pass batchedObjects to batchWrite to dDB
            console.log(`5`)
            await batchWriteListings(batchedObjects)
          }
         }

         if (deletedEvents.length) {

          //  Batch them up as dDB can only batch write 25 requests at a time. batch() returns a 2D array
          const batchedEvents = batch(deletedEvents, 25)
          // console.log(`BatchedEvents: ${JSON.stringify(batchedEvents)}`);

          // Then loop through each nested array of 25 events
          for (var i = 0; i < batchedEvents.length; i++) {
            var batchedObjects = []

            // And loop through each event within the nested array to convert it to an object
            for (var j = 0; j < batchedEvents[i].length; j++) {
              const event = batchedEvents[i][j]
              console.log(`Deleting item: ${event?.data?.uuid}`)
              var dappyObject = {
                uuid: event?.data?.uuid,
                address: event?.data?.address,
                dna: event?.data?.dna,
                name: event?.data?.name
              }
              console.log(`3`)
              batchedObjects.push(dappyObject)
            }

            // Pass batchedObjects to batchWrite to dDB
            await batchDeleteListings(batchedObjects)
          }
         }
          // TODO: Figure out what this means in KI
          // decoded.forEach(async (event) => await this.onEvent(event));
          // // Record the last block that we saw an event for
          // blockCursor = await this.blockCursorService.updateBlockCursorById(
          //   blockCursor.id,
          //   toBlock
          // );

        console.log(`FINISHED`)
      } catch (e) {
        // console.error(
        //   `Error retrieving events for block range fromBlock=${fromBlock} toBlock=${toBlock}`,
        //   e
        // );
        console.log(`e: ${e}`)
      }
    }
FlowEventMonitorLambda() 

