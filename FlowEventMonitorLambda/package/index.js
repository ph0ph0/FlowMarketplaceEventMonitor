const fcl = require("@onflow/fcl");
const sdk = require("@onflow/sdk")
require('dotenv').config()
const { config } = fcl;
const { batchWriteListings, batchDeleteListings } = require("./ListingsTableService")
const { batch, neutraliseArrays } = require("./utils")
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
         const {createdEvents, deletedEvents} = neutraliseArrays(listingsCreatedEvents, listingsDeletedEvents)
          if (createdEvents.length == 0 && deletedEvents.length == 0) {
            console.log("No events to write/delete, all were neutralised!")
          }

         if (createdEvents.length) {

          //  Batch them up as dDB can only batch write 25 requests at a time. batch() returns a 2D array
          const batchedEvents = batch(createdEvents, 25)
          console.log(`BatchedEvents: ${JSON.stringify(batchedEvents)}`);

          // Then loop through each nested array of 25 events
          for (var i = 0; i < batchedEvents.length; i++) {
            var batchedObjects = []

            // And loop through each event within the nested array to convert it to an object
            for (var j = 0; j < batchedEvents[i].length; j++) {
              console.log(`Writing item: ${decoded[j]?.data?.uuid}`)
              var dappyObject = {
                uuid: decoded[j]?.data?.uuid,
                address: decoded[j]?.data?.address,
                dna: decoded[j]?.data?.dna,
                name: decoded[j]?.data?.name
              }
              batchedObjects.push(dappyObject)
            }

            // Pass batchedObjects to batchWrite to dDB
            await batchWriteListings(batchedObjects)
          }
         }

         if (deletedEvents.length) {

          //  Batch them up as dDB can only batch write 25 requests at a time. batch() returns a 2D array
          const batchedEvents = batch(deletedEvents, 25)
          console.log(`BatchedEvents: ${JSON.stringify(batchedEvents)}`);

          // Then loop through each nested array of 25 events
          for (var i = 0; i < batchedEvents.length; i++) {
            var batchedObjects = []

            // And loop through each event within the nested array to convert it to an object
            for (var j = 0; j < batchedEvents[i].length; j++) {
              console.log(`Writing item: ${decoded[j]?.data?.uuid}`)
              var dappyObject = {
                uuid: decoded[j]?.data?.uuid,
                address: decoded[j]?.data?.address,
                dna: decoded[j]?.data?.dna,
                name: decoded[j]?.data?.name
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
      }
    }
FlowEventMonitorLambda() 

