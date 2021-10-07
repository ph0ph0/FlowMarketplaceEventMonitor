const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });

/**
 * Batch writes created listing objects to dDB
 * @param {object} items
 * @returns {void}
 */
module.exports.batchWriteListings = async (items) => {
  var writeItems = [];

  for (var i = 0; i < items.length; i++) {
    const dappyObject = items[i];

    const writeItem = {
      PutRequest: {
        Item: dappyObject,
      },
    };
    writeItems.push(writeItem);
  }

  const params = {
    RequestItems: {
      ListingTable: writeItems,
    },
  };

  console.log(`Batch writing: ${JSON.stringify(params)}`);
  try {
    console.log(`Trying to batch write`);
    const result = await ddb.batchWrite(params).promise();
    // TODO: Handle unprocessed items
    console.log(`Unprocesssed Items: ${JSON.stringify(result)}`);
    console.log(`Finished batch write to dDB`);
  } catch (error) {
    throw new Error(`ListingsTableService batchWriteListings(): ${error}`);
  }
};

/**
 * Batch deletes completed listings in dDB
 * @param {object} items
 * @returns {void}
 */
module.exports.batchDeleteListings = async (items) => {
  var deleteItemIDs = [];

  for (var i = 0; i < items.length; i++) {
    const listingResourceID = items[i].listingResourceID;
    const writeItem = {
      DeleteRequest: {
        Key: {
          listingResourceID,
        },
      },
    };
    deleteItemIDs.push(writeItem);
  }

  const params = {
    RequestItems: {
      ListingTable: deleteItemIDs,
    },
  };

  console.log(`Batch writing: ${JSON.stringify(params)}`);
  try {
    console.log(`Trying to batch delete`);
    const result = await ddb.batchWrite(params).promise();
    // TODO: Handle unprocessed items
    console.log(`Unprocesssed Items: ${JSON.stringify(result)}`);
    console.log(`Finished batch write to dDB`);
  } catch (error) {
    console.log(`Error batch deleting dDB: ${error}`);
  }
};
