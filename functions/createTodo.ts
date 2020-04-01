import { v4 as uuidv4 } from 'uuid';
import * as databaseLib from "./libs/database";
import { failure, success } from "./libs/response";

export const main = async (event) => {
  const data = JSON.parse(event.body);
  const userId = databaseLib.findUserId(event);
  const todoId = uuidv4();

  const params = {
    TableName: process.env.tableName,
    Item: {
      PK: `USER#${userId}`,
      SK: `TODO#${userId}#${todoId}`,
      todoId,
      userId,
      timestamp: Date.now(),
      done: false,
      ...data
    }
  };

  try {
    await databaseLib.call("put", params);
    return success(params.Item);
  } catch (error) {
    return failure({ status: false });
  }
};