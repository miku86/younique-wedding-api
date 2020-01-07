import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const userId = event.requestContext.identity.cognitoIdentityId;

  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk",
    ExpressionAttributeValues: {
      ":pk": { S: `USER#${userId}` }
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