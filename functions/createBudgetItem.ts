import { handler } from '../libs/handler';
import { v4 as uuidv4 } from 'uuid';
import { findUserId, putItem } from '../libs/database';

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const userId = findUserId(event);
  const budgetItemId = uuidv4();

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

  await putItem(params);
  return params.Item;
});