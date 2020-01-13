import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event, context) => {
  const userId = databaseLib.findUserId(event);
  const todoId = "123";

  console.log(event);

  console.log(context);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `TODO#USER#${userId}#${todoId}`,
    }
  };

  try {
    await databaseLib.call("delete", params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};