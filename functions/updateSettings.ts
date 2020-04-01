import * as databaseLib from "./libs/database";
import { failure, success } from "./libs/response";

export const main = async (event) => {
  const { data } = JSON.parse(event.body);
  const userId = databaseLib.findUserId(event);

  const UpdateExpression = databaseLib.createExpression(data);
  const ExpressionAttributeNames = databaseLib.createNames(data);
  const ExpressionAttributeValues = databaseLib.createValues(data);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `#METADATA#${userId}`,
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