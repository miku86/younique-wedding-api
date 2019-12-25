import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await databaseLib.call("query", params);
    return success(result.Items);
  } catch (error) {
    return failure({ status: false });
  }
};