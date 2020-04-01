import * as databaseLib from "./libs/database";
import { failure, success } from "./libs/response";

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

const fetchBudgetData = async (userId) => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `BUDGETITEM#${userId}`
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

export const main = async (event) => {
  const userId = databaseLib.findUserId(event);
  const todos = await fetchTodoData(userId);
  const guests = await fetchGuestData(userId);
  const budget = await fetchBudgetData(userId);
  let dashboardData = {todos, guests, budget};
  return success(dashboardData);
};