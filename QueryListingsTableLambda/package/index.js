const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });
const TableName = process.env.VOTE_TABLE_NAME;

const qltl = (event) => {};

qltl();
