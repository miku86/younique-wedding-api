import * as AWS from "aws-sdk";
import * as databaseLib from "./libs/database";
import { failure, success } from "./libs/response";

const SES = new AWS.SES();

export const main = async (event) => {
  const { feedback } = JSON.parse(event.body);
  const userId = databaseLib.findUserId(event);

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

  try {
    const response = await SES.sendEmail(params).promise();
    return success(response);
  } catch (error) {
    return failure({ status: false });
  };
};