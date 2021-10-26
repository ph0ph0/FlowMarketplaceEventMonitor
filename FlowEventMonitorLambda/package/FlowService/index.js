const fcl = require("@onflow/fcl");

/**
 * Gets the current block height from the Flow blockchain
 * @returns {int}
 */
module.exports.getCurrentBlockHeight = async () => {
  try {
    const block = await fcl.latestBlock(true)
    const latestBlockHeight = block.height
    return latestBlockHeight;
  } catch (error) {
    console.log(`Error fetching current block height`);
    throw new Error(`Flow Service getCurrentBlockHeight: ${error}`);
  }
};

/**
 * Searches for events between the latest block height and the blockheight saved for this event in dDB.
 * @param {int} latestBlockHeight
 * @param {{eventName: string, blockCursor: int}} cursor
 * @returns {{eventName: string, events: object, finalCursor: int}}
 */
module.exports.searchBlockRange = async (latestBlockHeight, cursor) => {
  console.log(`**********************`);
  console.log(`Latest blockHeight: ${latestBlockHeight}`);
  try {
    const stepSize = parseInt(process.env.BLOCK_RANGE_STEP_SIZE);
    const { eventName, blockCursor } = cursor;
    if (latestBlockHeight <= blockCursor) {
      throw new Error(
        `Flow Service searchBlockRange() Latest block height is less than blockCursor for event: ${eventName}`
      );
    }
    console.log(`eventName: ${eventName}, cursor: ${blockCursor}`);
    var events = [];
    var finalCursor = blockCursor;
    for (var i = blockCursor; i <= latestBlockHeight; i += stepSize) {
      const fromBlock = i === blockCursor ? blockCursor : i + 1;
      var toBlock =
        i + stepSize > latestBlockHeight ? latestBlockHeight : i + stepSize;
      console.log(`fromBlock: ${fromBlock}, toBlock: ${toBlock}`);

      if (fromBlock > toBlock) break;

      const result = await fcl.send([
        fcl.getEventsAtBlockHeightRange(eventName, fromBlock, toBlock),
      ]);
      const decoded = await fcl.decode(result);
      console.log(`Events: ${JSON.stringify(decoded)}`);
      finalCursor = fromBlock;
      if (toBlock >= latestBlockHeight) {
        finalCursor = toBlock;
      }
      if (decoded.length) {
        events.push(decoded);
      }
    }
    return { eventName, events, finalCursor };
  } catch (error) {
    console.log(`Error in FlowService searchBlockRange(): ${error}`);
    throw new Error(`FlowService searchBlockRange(): ${error}`);
  }
};
