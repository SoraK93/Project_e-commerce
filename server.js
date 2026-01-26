const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ quiet: true });

const app = express();

const port = process.env.PORT;

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening to PORT: ${port}`);
});
