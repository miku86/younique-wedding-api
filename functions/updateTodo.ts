import { handler } from "../libs/handler";
import {
  findUserId, createExpression, createNames, createValues, updateItem,
} from "../libs/database";

export const main = handler(async (event) => {
  const { todoId, data } = JSON.parse(event.body);
  const userId = findUserId(event);

  const UpdateExpression = createExpression(data);
  const ExpressionAttributeNames = createNames(data);
  const ExpressionAttributeValues = createValues(data);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `TODO#${userId}#${todoId}`,
    },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  await updateItem(params);
  return { status: true };
});
