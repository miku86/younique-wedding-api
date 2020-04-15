
import { failure, success } from "../libs/response";
import { deleteItem, findUserId } from "../libs/database";

export const main = async (event) => {
  const { todoId } = JSON.parse(event.body);
  const userId = findUserId(event);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `TODO#${userId}#${todoId}`,
    }
  };

  try {
    await deleteItem(params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};