import AWS from "aws-sdk";

export const call = (action, params) => {
  const database = new AWS.DynamoDB.DocumentClient();
  return database[action](params).promise();
};

export const findUserId = (event) => {
  const authProvider = event.requestContext.identity.cognitoAuthenticationProvider;
  const parts = authProvider.split(':');
  const userPoolUserId = parts[parts.length - 1];
  return userPoolUserId;
};