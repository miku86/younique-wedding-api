import { deleteItem, findUserId } from "../libs/database";
import { handler } from "../libs/handler";

export const main = handler(async (event) => {
  const { id: todoId } = JSON.parse(event.body);
  const userId = findUserId(event);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `TODO#${userId}#${todoId}`,
    },
  };

  try {
    await deleteItem(params);
    return { status: true };
  } catch (error) {
    return { status: false, error };
  }
});
