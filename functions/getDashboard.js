import * as databaseLib from "../libs/database";
import { failure } from "../libs/response";

const fetchTodoData = async (userId) => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `TODO#${userId}`
    }
  };

  try {
    const { Items } = await databaseLib.call("query", params);
    const amountItems = Items.length;
    const amountDoneItems = Items.filter(item => item.done).length;
    return { amountItems, amountDoneItems };
  } catch (error) {
    return failure({ status: false });
  }
};

const fetchGuestData = async (userId) => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `GUEST#${userId}`
    }
  };

  try {
    const { Items } = await databaseLib.call("query", params);
    const amountItems = Items.length;
    const amountDoneItems = Items.filter(item => item.coming).length;
    return { amountItems, amountDoneItems };
  } catch (error) {
    return failure({ status: false });
  }
};

export const main = async (event) => {
  const userId = databaseLib.findUserId(event);

  let dashboardData = {};
  dashboardData.todos = await fetchTodoData(userId);
  dashboardData.guests = await fetchGuestData(userId);

  console.log(dashboardData);

  return dashboardData;
};