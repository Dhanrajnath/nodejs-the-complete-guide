const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

mongoConnect((client) => {
  console.log(client);
  app.listen(3000);
});
