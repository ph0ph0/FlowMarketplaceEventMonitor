const AWS = require("aws-sdk");
const dDB = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });

const qltl = (event) => {
  console.log(`Event: ${event}`);

  const tableName = "ListingTable";
  const indexName = "staticKey-timestamp-index";

  const params = {
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression:
      "#staticKey = :staticKeyValue and #timestamp = :timestampValue",
    ExpressionAttributeNames: {
      "#staticKey": "staticKey",
      "#timestamp": "timestamp",
    },
    ExpressionAttributeValues: {
      ":staticKeyValue": 1,
      ":factorytimestampValueValue": factory,
    },
    Limit: 20,
  };

  try {
    const data = await ddb.query(params).promise();
    // Set a default value for the blockCursor
    console.log(`Data: ${JSON.stringify(data)}`);
  } catch (error) {
    console.log(`Error querying dDB`);
  }
};

qltl();
