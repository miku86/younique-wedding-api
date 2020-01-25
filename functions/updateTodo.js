import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  console.log("BODY", event.body);
  const { todoId, data } = JSON.parse(event.body);
  const userId = databaseLib.findUserId(event);

  console.log("DATA", data);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `TODO#${userId}#${todoId}`,
    },
    UpdateExpression: "SET comment = :c",
    ExpressionAttributeValues: {
      ":c": data.comment,
    },
    ReturnValues: "ALL_NEW"
  };

  console.log("PARAMS", params);

  try {
    await databaseLib.call("update", params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};