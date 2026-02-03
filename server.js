const app = require("./router/app")

const port = process.env.SERVER_PORT;

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening to PORT: ${port}`);
});
