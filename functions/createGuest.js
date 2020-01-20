import uuid from "uuid";
import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const data = JSON.parse(event.body);
  const userId = databaseLib.findUserId(event);
  const guestId = uuid.v4();

  const params = {
    TableName: process.env.tableName,
    Item: {
      PK: `USER#${userId}`,
      SK: `GUEST#USER#${userId}#${guestId}`,
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
    await databaseLib.call("put", params);
    return success(params.Item);
  } catch (error) {
    return failure({ status: false });
  };
};