const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const Book = require("./models/book");
const Library = require("./models/library");
Library.hasMany(Book);

const allRoutes = require("./routes/all-routes");
const errorController = require("./controllers/error");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(allRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.error(err));
