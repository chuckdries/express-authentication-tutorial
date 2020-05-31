const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("Express auth tutorial running on http://localhost:3000");
});
