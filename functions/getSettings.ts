import { handler } from '../libs/handler';
import { findUserId, queryItems } from "../libs/database";

export const main = handler(async (event) => {
  const userId = findUserId(event);

  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `#METADATA#${userId}`
    }
  };

  const result = await queryItems(params);
  return result.Items;
});