
const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });
const TableName = process.env.LISTINGS_TABLE_NAME;

module.exports.batchWriteListings = async (items) => {
    var writeItems = [];

    for (var i = 0; i < items.length; i++) {
        const item = items[i];

        const writeItem = {
            PutRequest: {
                Item: item
            }
        }
        writeItems.push(writeItem);
    }
    
    const params = {
        RequestItems: {
            TableName: writeItems
        }
    }

    console.log(`batchWriting: ${JSON.stringify(params)}`)
    ddb.batchWrite(params, function(err, data) {
        if (err) {
            console.log(`Error in batchWriteListings: ${err}`)
        }
        if (data) {
            console.log('Added ' + writeItems.length + ' items to Listings Table')
        }
    })
}