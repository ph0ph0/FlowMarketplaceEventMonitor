const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });

/**
 * Retrieves the latest block cursor for the passed in event from dDB.
 *  If no block cursor has been saved, it returns the current block height - fixedBlockRange
 * @param {string} event
 * @param {int} currentBlockHeight
 * @returns {{eventName: string, blockCursor: int}}
 */
module.exports.getBlockCursorForEvent = async (event, currentBlockHeight) => {
  // Event can be used as ID as it should be unique
  // If we don't have a cursor for that event,
  // we will set the cursor to the currentBlockHeight - 500
  const fixedBlockRange = parseInt(process.env.DEFAULT_BLOCK_RANGE);
  const eventName = event;
  var params = {
    TableName: "BlockCursorTable",
    Key: { eventName },
  };
  try {
    const data = await ddb.get(params).promise();
    // Set a default value for the blockCursor
    var blockCursor = currentBlockHeight - fixedBlockRange;
    console.log(`Data: ${JSON.stringify(data)}`);
    // If we find a saved blockHeight, update blockCursor
    if (Object.keys(data).length !== 0) {
      console.log(`Found bH: ${data.Item.cursorBlockHeight}`);
      blockCursor = data.Item.cursorBlockHeight;
    }
    return { eventName, blockCursor };
  } catch (error) {
    console.log(`Error in getBlockCursorForEvent: ${error}`);
    throw new Error(
      `BlockCursorTableService getBlockCursorForEvent(): ${error}`
    );
  }
};

/**
 * Saves to dDB the most recent block cursor for an event
 * @param {string} eventName
 * @param {int} finalCursor
 * @returns {void}
 */
module.exports.saveBlockCursorForEvent = async (eventName, finalCursor) => {
  console.log(`!!!!Saving blockCursor ${finalCursor} for ${eventName}`);
  const object = {
    eventName,
    cursorBlockHeight: finalCursor,
  };
  var params = {
    TableName: "BlockCursorTable",
    Item: object,
  };
  try {
    const data = await ddb.put(params).promise();
  } catch (error) {
    console.log(`Error saving block cursor for event: ${error}`);
    throw new Error(
      `BlockCursorTableService saveBlockCursorForEvent(): ${error}`
    );
  }
};
