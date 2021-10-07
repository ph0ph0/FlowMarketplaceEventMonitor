const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });

exports.handler = async (event) => {
  console.log(`Event: ${event}`);

  const tableName = "ListingTable";
  const indexName = "staticKey-timestamp-index";

  const params = {
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: "#key = :staticKey",
    ExpressionAttributeNames: {
      "#key": "staticKey",
    },
    ExpressionAttributeValues: {
      ":staticKey": 1,
    },
    Limit: 20,
    ScanIndexForward: false,
  };

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "OPTIONS,POST,ANY",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "*",
  };

  try {
    const data = await ddb.query(params).promise();
    // Set a default value for the blockCursor
    console.log(`Data: ${JSON.stringify(data)}`);
    return {
      isBase64Encoded: false,
      statusCode: 202,
      headers: headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(`Error querying dDB: ${error}`);
    return {
      isBase64Encoded: false,
      statusCode: 500, // return error response
      headers: headers,
      body: error,
    };
  }
};
