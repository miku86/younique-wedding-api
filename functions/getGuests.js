import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const userId = databaseLib.findUserId(event);

  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `GUEST#USER#${userId}`
    }
  };

  try {
    const result = await databaseLib.call("query", params);
    return success(result.Items);
  } catch (error) {
    return failure({ status: false });
  }
};