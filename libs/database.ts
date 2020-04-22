import * as AWS from "aws-sdk";

const database = new AWS.DynamoDB.DocumentClient();

export const getItem = (params) => database.get(params).promise();
export const putItem = (params) => database.put(params).promise();
export const queryItems = (params) => database.query(params).promise();
export const updateItem = (params) => database.update(params).promise();
export const deleteItem = (params) => database.delete(params).promise();

export const findUserId = (event) => {
  const authProvider = event.requestContext.identity.cognitoAuthenticationProvider;
  const parts = authProvider.split(":");
  const userPoolUserId = parts[parts.length - 1];
  return userPoolUserId;
};

export const createNames = (data) => {
  const names = {};
  Object.keys(data).forEach((key) => {
    names[`#${key}`] = key;
  });
  return names;
};

export const createValues = (data) => {
  const values = {};
  Object.keys(data).forEach((key) => {
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
    .map((key) => `#${[key]} = :${key}`)
    .join(", ");
  return `SET ${expression}`;
};
