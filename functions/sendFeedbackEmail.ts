import { handler } from '../libs/handler';
import * as AWS from "aws-sdk";
import { findUserId } from "../libs/database";

const SES = new AWS.SES();

export const main = handler(async (event) => {
  const { feedback } = JSON.parse(event.body);
  const userId = findUserId(event);

  const params = {
    Destination: {
      ToAddresses: ["miku86coding@gmail.com"],
    },
    Message: {
      Body: {
        Text: {
          Data: `User "${userId}" möchte: "${feedback}"`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Feedback: neues Feature',
      },
    },
    Source: "miku86coding@gmail.com",
  };

  const response = await SES.sendEmail(params).promise();
  return response;
});