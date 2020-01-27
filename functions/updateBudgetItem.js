import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

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
    } else if (data[key] === "" || data[key] === null) {
      values[`:${key}`] = null;
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
  const { budgetItemId, data } = JSON.parse(event.body);
  const userId = databaseLib.findUserId(event);

  const UpdateExpression = createExpression(data);
  const ExpressionAttributeNames = createNames(data);
  const ExpressionAttributeValues = createValues(data);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `BUDGETITEM#${userId}#${budgetItemId}`,
    },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: "ALL_NEW"
  };

  try {
    await databaseLib.call("update", params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};