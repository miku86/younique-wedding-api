import * as debug from "./debug";

export const handler = (lambda) => (
  (event, context) => Promise.resolve()
    .then(() => debug.init(event, context))
    .then(() => lambda(event, context))
    .then((responseBody) => [200, responseBody])
    .catch((error) => {
      debug.flush(error);
      return [500, { error: error.message }];
    })
    .then(([statusCode, body]) => ({
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(body),
    }))
    .finally(debug.end)
);
