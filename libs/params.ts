export const createTodoParams = (userId) => ({
  TableName: process.env.tableName,
  KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
  ExpressionAttributeValues: {
    ":pk": `USER#${userId}`,
    ":sk": `TODO#${userId}`,
  },
});

export const createGuestParams = (userId) => ({
  TableName: process.env.tableName,
  KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
  ExpressionAttributeValues: {
    ":pk": `USER#${userId}`,
    ":sk": `GUEST#${userId}`,
  },
});

export const createBudgetParams = (userId) => ({
  TableName: process.env.tableName,
  KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
  ExpressionAttributeValues: {
    ":pk": `USER#${userId}`,
    ":sk": `BUDGETITEM#${userId}`,
  },
});
