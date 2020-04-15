import { handler } from '../libs/handler';
import { queryItems, findUserId } from "../libs/database";

const fetchTodoData = handler(async (event) => {
  const userId = findUserId(event);

  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `TODO#${userId}`
    }
  };

  const { Items } = await queryItems(params);
  const amountItems = Items.length;
  const amountDoneItems = Items.filter(item => item.done).length;
  return { amountItems, amountDoneItems };
});

const fetchGuestData = handler(async (event) => {
  const userId = findUserId(event);

  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `GUEST#${userId}`
    }
  };

  const { Items } = await queryItems(params);
  const amountItems = Items.length;
  const amountDoneItems = Items.filter(item => item.coming).length;
  return { amountItems, amountDoneItems };
});

const fetchBudgetData = handler(async (event) => {
  const userId = findUserId(event);

  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `BUDGETITEM#${userId}`
    }
  };

  const { Items } = await queryItems(params);
  const amountItems = Items.length;
  const amountDoneItems = Items.filter(item => item.done).length;
  return { amountItems, amountDoneItems };
});

export const main = async (event, context) => {
  const todos = await fetchTodoData(event, context);
  const guests = await fetchGuestData(event, context);
  const budget = await fetchBudgetData(event, context);
  let dashboardData = {todos, guests, budget};
  return dashboardData;
};