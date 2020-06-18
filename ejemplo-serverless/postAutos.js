const { DocumentClient } = require('aws-sdk/clients/dynamodb');

let dynamoDb;

if (process.env.IS_OFFLINE === 'true') {
    dynamoDb = new DocumentClient({
        region: 'localhost',
        endpoint: process.env.CONFIG_DYNAMODB_ENDPOINT,
    });
}
else {
    dynamoDb = new DocumentClient({ region: 'us-east-1' });
}

module.exports.handler = async (event) => {
    console.log(event);
    
    var params = {
        TableName: `autos`,
        Item: {
            id: Math.random()*100+'',
            marca: 'Mitsbishi'
        },
    };

    try {
        await dynamoDb.put(params).promise()
        return {
            statusCode:200,
            body: 'done'
        }
    }
    catch (e) {
        console.log(e);
         return {
            statusCode:500,
            body: 'error'
        }
    }

}