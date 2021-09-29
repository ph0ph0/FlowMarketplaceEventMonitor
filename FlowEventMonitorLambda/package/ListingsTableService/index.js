// const AWS = require("aws-sdk");
// const ddb = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });

module.exports.batchWriteListings = async (items) => {
  var writeItems = [];

  for (var i = 0; i < items.length; i++) {
    var dappyObject = {
      uuid: items[i]?.data?.uuid,
      address: items[i]?.data?.address,
      dna: items[i]?.data?.dna,
      name: items[i]?.data?.name,
    };

    const writeItem = {
      PutRequest: {
        Item: dappyObject,
      },
    };
    writeItems.push(writeItem);
  }

  const params = {
    RequestItems: {
      ListingsTable: writeItems,
    },
  };

  console.log(`Batch writing: ${JSON.stringify(params)}`);
  //   try {
  //     console.log(`Trying to batch write`);
  //     const result = await ddb.batchWrite(params).promise();
  //     // TODO: Handle unprocessed items
  //     console.log(`Unprocesssed Items: ${JSON.stringify(result)}`);
  //     console.log(`Finished batch write to dDB`);
  //   } catch (error) {
  //     console.log(`Error batch writing to dDB: ${error}`);
  //   }
};

module.exports.batchDeleteListings = async (items) => {
  var deleteItemIDs = [];

  for (var i = 0; i < items.length; i++) {
    const itemID = items[i]?.data?.uuid;
    const itemAddress = items[i]?.data?.address;
    console.log(`itemID: ${itemID}`);
    const writeItem = {
      DeleteRequest: {
        Key: {
          uuid: itemID,
          address: itemAddress,
        },
      },
    };
    deleteItemIDs.push(writeItem);
  }

  const params = {
    RequestItems: {
      ListingsTable: deleteItemIDs,
    },
  };

  console.log(`Batch writing: ${JSON.stringify(params)}`);
  //   try {
  //     console.log(`Trying to batch delete`);
  //     const result = await ddb.batchWrite(params).promise();
  //     // TODO: Handle unprocessed items
  //     console.log(`Unprocesssed Items: ${JSON.stringify(result)}`);
  //     console.log(`Finished batch write to dDB`);
  //   } catch (error) {
  //     console.log(`Error batch writing to dDB: ${error}`);
  //   }
};
