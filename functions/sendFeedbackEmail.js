import AWS from "aws-sdk";
import { failure, success } from "../libs/response";

const SES = new AWS.SES();

export const main = async (event) => {
  const data = JSON.parse(event.body);

  const params = {
    Destination: {
      ToAddresses: ["miku86coding@gmail.com"],
    },
    Message: {
      Body: {
        Text: {
          Data: data,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Feedback',
      },
    },
    Source: "miku86coding@gmail.com",
  };

  try {
    const response = await SES.sendEmail(params).promise();
    console.log(response);
    return success(response);
  } catch (error) {
    return failure({ status: false });
  };
};