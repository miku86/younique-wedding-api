import { handler } from '../libs/handler';
import { failure, success } from "../libs/response";
import { updateItem, findUserId, createExpression, createNames, createValues } from "../libs/database";

export const main = handler(async (event) => {
  const { data } = JSON.parse(event.body);
  const userId = findUserId(event);

  const UpdateExpression = createExpression(data);
  const ExpressionAttributeNames = createNames(data);
  const ExpressionAttributeValues = createValues(data);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `#METADATA#${userId}`,
    },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: "ALL_NEW"
  };

  try {
    await updateItem(params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};