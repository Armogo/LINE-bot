"use strict";

const line = require("@line/bot-sdk");
const express = require("express");

// set custom process.env variables
require("dotenv").config();

// create LINE SDK config from env variables
const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;
const CHANNEL_SECRET = process.env.CHANNEL_SECRET;

const config = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
};

// abort running request if it lacks token
if (!CHANNEL_ACCESS_TOKEN || !CHANNEL_SECRET) {
  console.error(
    `[error]: The "${
      CHANNEL_ACCESS_TOKEN ? "CHANNEL_SECRET" : "CHANNEL_ACCESS_TOKEN"
    }" environment variable is required`
  );
  process.exit(1);
}

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/", line.middleware(config), (req, res) => {
  console.log("\nEvents", req.body.events);
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => {
      console.log("result", result);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  console.log("\nHere is the event object", event);
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: "text", text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
