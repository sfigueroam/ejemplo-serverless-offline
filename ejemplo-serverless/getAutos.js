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
        TableName: "autos"
    };
    
    
    try {
        let autos = await dynamoDb.scan(params).promise()
        return {
            statusCode:200,
            body: JSON.stringify(autos)
        }
    }
    catch (e) {
        console.log(e);
    }

    
}