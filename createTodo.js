import uuid from "uuid";
import * as databaseLib from "./libs/database";
import { failure, success } from "./libs/response";

export const main = async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      todoId: uuid.v4(),
      content: data.content,
      createdAt: Date.now()
    }
  };

  try {
    await databaseLib.call("put", params);
    return success(params.Item);
  } catch (error) {
    return failure({ status: false });
  };
};