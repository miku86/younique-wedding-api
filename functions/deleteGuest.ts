import { handler } from '../libs/handler';
import { findUserId, deleteItem } from "../libs/database";

export const main = handler(async (event) => {
  const { guestId } = JSON.parse(event.body);
  const userId = findUserId(event);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `GUEST#${userId}#${guestId}`,
    }
  };

  await deleteItem(params);
  return { status: true };
});