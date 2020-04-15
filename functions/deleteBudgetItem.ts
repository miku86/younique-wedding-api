import { handler } from '../libs/handler';
import { failure, success } from "../libs/response";
import { findUserId, deleteItem } from "../libs/database";

export const main = handler(async (event) => {
  const { budgetItemId } = JSON.parse(event.body);
  const userId = findUserId(event);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `BUDGETITEM#${userId}#${budgetItemId}`,
    }
  };

  try {
    await deleteItem(params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};