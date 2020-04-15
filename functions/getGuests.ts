import { handler } from '../libs/handler';
import { failure, success } from "../libs/response";
import { findUserId, queryItems } from "../libs/database";

export const main = handler(async (event) => {
  const userId = findUserId(event);

  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `GUEST#${userId}`
    }
  };

  try {
    const result = await queryItems(params);
    return success(result.Items);
  } catch (error) {
    return failure({ status: false });
  }
};