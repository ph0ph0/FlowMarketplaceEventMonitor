const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });

module.exports.getBlockCursorForEvent = async (event, currentBlockHeight) => {
  // Event can be used as ID as it should be unique
  //   If we don't have a cursor for that event,
  //   we will set the cursor to the currentBlockHeight - 5000
  const fixedBlockRange = 5000;
  const eventName = event;
  var params = {
    TableName: "BlockCursorTable",
    Key: { eventName },
  };
  try {
    const data = await ddb.get(params).promise();
    var blockCursor = currentBlockHeight - fixedBlockRange;
    console.log(`Data: ${JSON.stringify(data)}`);
    if (Object.keys(data).length !== 0) {
      console.log(`Found bH: ${data.Item.cursorBlockHeight}`);
      blockCursor = data.Item.cursorBlockHeight;
    }
    return { eventName, blockCursor };
  } catch (error) {
    console.log(`Error in getBlockCursorForEvent: ${err}`);
    throw new Error(
      `BlockCursorTableService getBlockCursorForEvent(): ${error}`
    );
  }
};

module.exports.saveBlockCursorForEvent = async (eventName, finalCursor) => {
  console.log(`!!!!SAVING BLOCK CURSOR ${finalCursor} for ${eventName}`);
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
    console.log(`Block cursor save data: ${JSON.stringify(data)}`);
  } catch (error) {
    console.log(`Error saving block cursor for event: ${err}`);
    throw new Error(
      `BlockCursorTableService saveBlockCursorForEvent(): ${error}`
    );
  }
};

// const run = async () => {
//   const x = await getBlockCursorForEvent("aMadeUpEvent", 10000);
//   console.log(`Cursor: ${JSON.stringify(x)}`);
// };

// run();
