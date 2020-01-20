import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const { guestId, fieldKey, newFieldValue } = JSON.parse(event.body);
  const userId = databaseLib.findUserId(event);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `GUEST#USER#${userId}#${guestId}`,
    },
    UpdateExpression: `SET ${fieldKey} = :newFieldValue`,
    ExpressionAttributeValues: {
      ":newFieldValue": newFieldValue
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    await databaseLib.call("update", params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};