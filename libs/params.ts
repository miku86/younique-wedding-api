export const createTodoParams = (userId) => {
  return {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `TODO#${userId}`
    }
  }
};

export const createGuestParams = (userId) => {
  return {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `GUEST#${userId}`
    }
  }
};

export const createBudgetParams = (userId) => {
  return {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `BUDGETITEM#${userId}`
    }
  };
};
