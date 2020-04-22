import { findUserId, queryItems } from "../libs/database";
import { handler } from "../libs/handler";
import { createGuestParams } from "../libs/params";

export const main = handler(async (event) => {
  const userId = findUserId(event);
  const params = createGuestParams(userId);
  const result = await queryItems(params);
  return result.Items;
});
