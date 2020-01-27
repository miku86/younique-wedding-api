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

export const createNames = (data) => {
  const names = {};
  Object.keys(data).forEach(key => {
    names[`#${key}`] = key;
  });
  return names;
};

export const createValues = (data) => {
  const values = {};
  Object.keys(data).forEach(key => {
    if (typeof data[key] === "boolean") {
      values[`:${key}`] = data[key];
    } else if (data[key] === "" || data[key] === null) {
      values[`:${key}`] = null;
    } else {
      values[`:${key}`] = `${data[key]}`;
    }
  });
  return values;
};

export const createExpression = (data) => {
  const expression = Object
    .keys(data)
    .map(key => `#${[key]} = :${key}`)
    .join(", ");
  return `SET ${expression}`;
};