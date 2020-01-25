import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

const cleanData = (data) => {
  Object.entries(data).forEach(([key, val]) => (val === null || val === "") && delete data[key]);
  return data;
};

const createNames = (data) => {
  const names = {};
  Object.keys(data).forEach(key => {
    names[`#${key}`] = key;
  });
  return names;
};

const createValues = (data) => {
  const values = {};
  Object.keys(data).forEach(key => {
    if (typeof data[key] === "boolean") {
      values[`:${key}`] = data[key];
    } else {
      values[`:${key}`] = `${data[key]}`;
    }
  });
  return values;
};

const createExpression = (data) => {
  const expression = Object
    .keys(data)
    .map(key => `#${[key]} = :${key}`)
    .join(", ");
  return `SET ${expression}`;
};

export const main = async (event) => {
  const { todoId, data } = JSON.parse(event.body);
  const userId = databaseLib.findUserId(event);

  const cleanedData = cleanData(data);

  const UpdateExpression = createExpression(cleanedData);
  const ExpressionAttributeNames = createNames(cleanedData);
  const ExpressionAttributeValues = createValues(cleanedData);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `TODO#${userId}#${todoId}`,
    },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: "ALL_NEW"
  };

  console.log(params);

  try {
    await databaseLib.call("update", params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};