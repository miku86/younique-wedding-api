import AWS from "aws-sdk";
import { failure, success } from "../libs/response";

const SES = new AWS.SES();

export const main = async (event) => {
  console.log("EVENT.BODY", event.body);
  const data = JSON.parse(event.body);
  console.log("PARSED", data);

  const params = {
    Destination: {
      ToAddresses: ["miku86coding@gmail.com"],
    },
    Message: {
      Body: {
        Text: {
          Data: data.value,
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