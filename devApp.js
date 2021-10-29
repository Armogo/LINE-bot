// for the convenience of development and simple testing
const nodemon = require("nodemon");
const ngrok = require("ngrok");

const port = process.env.PORT || 3000;

// ngrok will generate a new url
let url = null;

// run app through nodemon
nodemon({
  script: "app.js",
  ext: "js",
});

// nodemon setting with ngrok
nodemon
  .on("start", async () => {
    if (!url) {
      url = await ngrok.connect({ port });
      console.log(`ngrok tunnel at: ${url}`);
      console.log("ngrok dashboard at: https://localhost:4040");
    }
  })
  .on("restart", () => {
    console.log(`\n------server restarted`);
    console.log(`ngrok tunnel at: ${url}`);
    console.log("ngrok dashboard at: https://localhost:4040");
  })
  .on("quit", async () => {
    await ngrok.kill();
  });
