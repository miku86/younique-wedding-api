import * as databaseLib from "../libs/database";
import { failure, success } from "../libs/response";

export const main = async (event) => {
  const { todoId, data } = JSON.parse(event.body);
  const userId = databaseLib.findUserId(event);

  console.log(data);

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `TODO#${userId}#${todoId}`,
    },
    UpdateExpression: `SET #done: :done, #t = :t, #d = :d, #c = :c, #r = :r`,
    ExpressionAttributeNames: {
      "#done": "done",
      "#t": "title",
      "#d": "deadline",
      "#c": "comment",
      "#r": "responsible"
    },
    ExpressionAttributeValues: {
      ":done": data.done,
      ":t": data.title,
      ":d": data.deadline,
      ":c": data.comment,
      ":r": data.responsible
    },
    ReturnValues: "ALL_NEW"
  };

  console.log(params);

  try {
    await databaseLib.call("update", params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
};