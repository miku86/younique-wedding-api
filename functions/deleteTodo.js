import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      todoId: event.pathParameters.id
    }
  };

  try {
    await databaseLib.call("delete", params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};