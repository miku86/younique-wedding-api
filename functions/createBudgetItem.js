import uuid from "uuid";
import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const data = JSON.parse(event.body);
  const userId = databaseLib.findUserId(event);
  const budgetItemId = uuid.v4();

  const params = {
    TableName: process.env.tableName,
    Item: {
      PK: `USER#${userId}`,
      SK: `BUDGETITEM#${userId}#${budgetItemId}`,
      budgetItemId,
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
  };
};