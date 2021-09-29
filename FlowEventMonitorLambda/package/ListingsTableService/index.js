// TODO: UC
// const AWS = require("aws-sdk");
// const ddb = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });

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
            'ListingsTable': writeItems
        }
    }

    console.log(`Batch writing: ${JSON.stringify(params)}`)
    // TODO: UC
    // try {
    //     console.log(`Trying to batch write to dDB`)
    //     const result = await ddb.batchWrite(params).promise()
    //     // TODO: Handle unprocessed items
    //     console.log(`Unprocesssed Items: ${result}`)
    //     console.log(`Finished batch write to dDB`)
    // } catch(error) {
    //     console.log(`Error batch writing to dDB: ${error}`)
    // }
}

module.exports.batchDeleteListings = async (items) => {
    var deleteItemsIDs = [];

    for (var i = 0; i < items.length; i++) {
        const itemID = items[i];

        const writeItem = {
            DeleteRequest: {
                Item: item
            }
        }
        deleteItemsIDs.push(writeItem);
    }
    
    const params = {
        RequestItems: {
            'ListingsTable': writeItems
        }
    }

    console.log(`Batch writing: ${JSON.stringify(params)}`)
    // TODO: UC
    // try {
    //     console.log(`Trying to batch write to dDB`)
    //     const result = await ddb.batchWrite(params).promise()
    //     // TODO: Handle unprocessed items
    //     console.log(`Unprocesssed Items: ${result}`)
    //     console.log(`Finished batch write to dDB`)
    // } catch(error) {
    //     console.log(`Error batch writing to dDB: ${error}`)
    // }
}