const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB();

const getAllItems = async () => {
const params = {
TableName: 'user' // Replace with your actual table name
};

try {
const data = await documentClient.scan(params).promise();
return data.Items;
} catch (error) {
console.error('Error retrieving items from DynamoDB:', error);
throw error;
}
};
module.exports.hello = async (event) => {


try {
  const items = await getAllItems();
  console.log('Retrieved items:', items);
  return {

    statusCode: 200,
    body: JSON.stringify(
      {
        message:items,
      
        input: event,
      },
      null,
      2
    ),
  };
  // Process the items further as needed
  } catch (error) {
  // Handle the error
  return {

    statusCode: 200,
    body: JSON.stringify(
      {
        message:error,
      
        input: event,
      },
      null,
      2
    ),
  };
  }
  };
  
    
  
