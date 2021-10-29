const line = require("@line/bot-sdk");
require("dotenv").config();
const fs = require("fs");
const FileType = require("file-type");

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

// 直接使用 GET request 也可
// GET https://api-data.line.me/v2/bot/message/14993972709446/content
client.getMessageContent("14993972709446").then((stream) => {
  stream.on("data", (chunk) => {
    console.log(typeof chunk);
    //TODO figure out how to save the image file to local
  });
  stream.on("error", (err) => {
    // error handling
    console.error(err);
  });
});

// 參考
// https://chrisfrew.in/blog/saving-images-in-node-js-using-fetch-with-array-buffer-and-buffer/
import fs from "fs";
import fetch from "node-fetch";
import FileType from "file-type";

const API_URL_HERE = "your-api-url.whatever";

async function savePhotoFromAPI() {
  const response = await fetch(API_URL_HERE);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileType = await FileType.fromBuffer(buffer);
  if (fileType.ext) {
    const outputFileName = `yourfilenamehere.${fileType.ext}`;
    fs.createWriteStream(outputFileName).write(buffer);
  } else {
    console.log(
      "File type could not be reliably determined! The binary data may be malformed! No file saved!"
    );
  }
}

savePhotoFromAPI();
