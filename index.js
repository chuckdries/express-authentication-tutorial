const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded());

const messages = ["hello world"];

function getHome(request, response) {
  response.render("home", {
    time: new Date().toLocaleTimeString(),
    messages,
  });
}

function receiveMessage(request, response) {
  messages.push(request.body.message);
  console.log(messages);
  response.redirect("/");
}

app.get("/", getHome);

app.post("/", receiveMessage);

app.listen(3000, () => {
  console.log("Express auth tutorial running on http://localhost:3000");
});
