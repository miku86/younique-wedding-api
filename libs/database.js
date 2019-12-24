import AWS from "aws-sdk";

export const call = (action, params) => {
  const database = new AWS.DynamoDB.DocumentClient();
  return database[action](params).promise();
};