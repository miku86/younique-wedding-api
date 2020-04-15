import { v4 as uuidv4 } from 'uuid';

import { failure, success } from "../libs/response";
import { findUserId, putItem } from '../libs/database';

export const main = async (event) => {
  const data = JSON.parse(event.body);
  const userId = findUserId(event);
  const guestId = uuidv4();

  const params = {
    TableName: process.env.tableName,
    Item: {
      PK: `USER#${userId}`,
      SK: `GUEST#${userId}#${guestId}`,
      guestId,
      userId,
      timestamp: Date.now(),
      sentSaveTheDate: false,
      sentInvite: false,
      receivedResponse: false,
      coming: false,
      ...data
    }
  };

  try {
    await putItem(params);
    return success(params.Item);
  } catch (error) {
    return failure({ status: false });
  }
};