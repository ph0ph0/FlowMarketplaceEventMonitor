const fcl = require("@onflow/fcl");
const { config } = fcl;

module.exports.getCurrentBlockHeight = async () => {
  try {
    await config().put("accessNode.api", "https://access-testnet.onflow.org");
    const block = await fcl.send([fcl.getBlock(true)]);
    const decoded = await fcl.decode(block);
    return decoded.height;
  } catch (error) {
    console.log(`Error fetching current block height`);
    throw new Error(`Flow Service getCurrentBLockHeight: ${error}`);
  }
};

// Flow service
const cursors = [
  { eventName: "aMadeUpEvent", blockCursor: 4666300 },
  { eventName: "secondEvent", blockCursor: 4667300 },
  { eventName: "third", blockCursor: 4666746 },
];

module.exports.searchBlockRange = async (latestBlockHeight, cursor) => {
  console.log(`**********************`);
  console.log(`Latest blockHeight: ${latestBlockHeight}`);
  try {
    const stepSize = 249;
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
      console.log(`RESULT: ${JSON.stringify(result)}`);
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

// const run = async () => {
//   const x = await Promise.all(
//     cursors.map(async (cursor) => await searchBlockRange(4666900, cursor))
//   );
//   console.log(`events: ${JSON.stringify(x)}`);
// };
// run();

// const result = await fcl.send([
//   fcl.getEventsAtBlockHeightRange(`A.${eventName}`, fromBlock, toBlock),
// ]);
// console.log(`RESULT: ${JSON.stringify(result)}`);
// const decoded = await fcl.decode(result);
// console.log(`Events: ${JSON.stringify(decoded)}`);

// `A.${contractAddress}.${contractName}.${eventName}`,
// A.e223d8a629e49c68.FUSD.TokensWithdrawn
// A.e223d8a629e49c68.FUSD.TokensWithdrawn
