const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const db = require("better-sqlite3")("data.db");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded());

function getHome(request, response) {
  const messages = db.prepare("SELECT * FROM messages").all();
  response.render("home", {
    time: new Date().toLocaleTimeString(),
    messages,
  });
}

function receiveMessage(request, response) {
  db.prepare(`INSERT INTO messages (message) VALUES (?) `).run(
    request.body.message
  );
  const messages = db.prepare("SELECT * FROM messages").all();
  console.log(messages);
  response.redirect("/");
}

app.get("/", getHome);

app.post("/", receiveMessage);

const setupDatabase = () => {
  console.log(db);
  db.prepare(
    `CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY,
    message STRING
  );`
  ).run();
  const messages = db.prepare("SELECT * FROM messages").all();
  console.log(messages);
};

setupDatabase();

app.listen(3000, () => {
  console.log("Express auth tutorial running on http://localhost:3000");
});
