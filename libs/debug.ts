import * as AWS from "aws-sdk";
import * as util from "util";


const logs = [];
let timeoutTimer;

export function debug(data) {
  logs.push({
    date: new Date(),
    string: util.format(data),
  });
}

AWS.config.logger = { log: debug };

export const flush = (error) => {
  logs.forEach(({ date, string }) => console.debug(date, string));
  console.error(error);
};

export const init = (event, context) => {
  debug({
    source: "API event",
    body: event.body,
    pathParameters: event.pathParameters,
    queryStringParameters: event.queryStringParameters,
  });

  timeoutTimer = setTimeout(() => {
    timeoutTimer && flush(new Error("Lambda will timeout in 100 ms"));
  }, context.getRemainingTimeInMillis() - 100);
};

export const end = () => {
  clearTimeout(timeoutTimer);
  timeoutTimer = null;
};
