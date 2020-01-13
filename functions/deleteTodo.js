import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const userId = databaseLib.findUserId(event);

  console.log(event.requestContext);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `abc`,
      SK: `123`
    }
  };

  try {
    await databaseLib.call("delete", params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};