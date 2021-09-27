const fcl = require("@onflow/fcl");
const sdk = require("@onflow/sdk")
require('dotenv').config()
const { config } = fcl;

const FlowEventMonitorLambda = async () => {
  // configure fcl
  await config().put("accessNode.api", process.env.ACCESS_NODE);

  try {
    // Get the most recent sealed block
    const block = await fcl.send([fcl.getBlock(true)]);
    decoded = await fcl.decode(block);
    
    // Get the current block height
    startingBlockHeight = decoded.height
    console.log(`height: ${startingBlockHeight}`)

    // Get the block cursor
    // If no block cursor, set it to the current block height - 249; that's the largest spread you can do.
    // Query dDB to get bH.
    const fromBlock = startingBlockHeight - 249
    const toBlock = startingBlockHeight

    // Event details
    const contractAddress = "e223d8a629e49c68"
    const contractName = "FUSD"
    const eventName = "TokensWithdrawn"


    if (fromBlock <= toBlock) {
      try {
        // Query for events
        const result = await fcl.send([
          fcl.getEventsAtBlockHeightRange(`A.${contractAddress}.${contractName}.${eventName}`, fromBlock, toBlock)
        ]);
        const decoded = await fcl.decode(result)
        console.log(`Events: ${JSON.stringify(decoded)}`)
        
        // If we have some events, do something with them.
        if (decoded.length) {
          // Update cursor in dDB
          // Convert event to an object
          // Save object in dDB

          // decoded.forEach(async (event) => await this.onEvent(event));
          // // Record the last block that we saw an event for
          // blockCursor = await this.blockCursorService.updateBlockCursorById(
          //   blockCursor.id,
          //   toBlock
          // );
        }
      } catch (e) {
        console.error(
          `Error retrieving events for block range fromBlock=${fromBlock} toBlock=${toBlock}`,
          e
        );
      }
    }
  } catch(e) {
    console.log(`E: ${e}`)
  }
}
FlowEventMonitorLambda()