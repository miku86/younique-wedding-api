import { findUserId, queryItems } from "../libs/database";
import { handler } from "../libs/handler";
import { createBudgetParams, createGuestParams, createTodoParams } from "../libs/params";

const createDetailsObject = (items) => ({
  amountItems: items.length,
  amountDoneItems: items.filter((item) => item.done).length,
});

export const main = handler(async (event) => {
  const userId = findUserId(event);

  const todoParams = createTodoParams(userId);
  const todos = await queryItems(todoParams);
  const todosDetails = createDetailsObject(todos.Items);

  const guestParams = createGuestParams(userId);
  const guests = await queryItems(guestParams);
  const guestsDetails = createDetailsObject(guests.Items);

  const budgetParams = createBudgetParams(userId);
  const budgets = await queryItems(budgetParams);
  const budgetsDetails = createDetailsObject(budgets.Items);

  return {
    todos: todosDetails,
    guests: guestsDetails,
    budget: budgetsDetails,
  };
});
