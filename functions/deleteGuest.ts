
import { failure, success } from "../libs/response";
import { findUserId, deleteItem } from "../libs/database";

export const main = async (event) => {
  const { guestId } = JSON.parse(event.body);
  const userId = findUserId(event);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `GUEST#${userId}#${guestId}`,
    }
  };

  try {
    await deleteItem(params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};