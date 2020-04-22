import { handler } from "../libs/handler";
import { deleteItem, findUserId } from "../libs/database";

export const main = handler(async (event) => {
  const { todoId } = JSON.parse(event.body);
  const userId = findUserId(event);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `TODO#${userId}#${todoId}`,
    },
  };

  await deleteItem(params);
  return { status: true };
});
