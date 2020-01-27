import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const { todoId } = JSON.parse(event.body);
  const userId = databaseLib.findUserId(event);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `TODO#${userId}#${todoId}`,
    }
  };

  try {
    await databaseLib.call("delete", params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};