import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const userId = event.requestContext.identity.cognitoIdentityId;

  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `TODO#USER#792bdd6d-c98c-4b81-a9da-64b3a5de8478`
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