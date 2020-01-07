import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const userId = event.requestContext.identity.cognitoIdentityId;
  const pk = `USER#${userId}`;
  const sk = `TODO#USER#${userId}`;

  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": pk,
      ":sk": sk
    }
  };

  try {
    await databaseLib.call("query", params);
    console.log(userId);
    return success({
      userId,
      pk,
      sk
    }
    );
  } catch (error) {
    return failure({ status: false });
  }
};