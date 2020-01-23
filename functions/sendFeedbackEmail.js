import AWS from "aws-sdk";

const SES = new AWS.SES();

export const main = async (event) => {
  const sesParams = {
    Destination: {
      ToAddresses: ["miku86coding@gmail.com"],
    },
    Message: {
      Body: {
        Text: {
          Data: "Hello",
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Feedback',
      },
    },
    Source: "miku86coding@gmail.com",
  };
  console.log(sesParams);

  const response = await SES.sendEmail(sesParams).promise();
  console.log(response);
};