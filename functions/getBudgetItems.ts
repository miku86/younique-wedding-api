
import { failure, success } from "../libs/response";
import { queryItems, findUserId } from "../libs/database";

export const main = async (event) => {
  const userId = findUserId(event);

  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `BUDGETITEM#${userId}`
    }
  };

  try {
    const result = await queryItems(params);
    return success(result.Items);
  } catch (error) {
    return failure({ status: false });
  }
};