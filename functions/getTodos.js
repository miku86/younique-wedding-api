import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const userId = event.requestContext.identity.cognitoIdentityId;

  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND BEGINS_WITH (SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `TODO#USER#${userId}`
    }
  };

  try {
    const result = await databaseLib.call("query", params);
    console.log(result);
    return success(result.Items);
  } catch (error) {
    return failure({ status: false });
  }
};