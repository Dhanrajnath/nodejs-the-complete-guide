const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const Book = require("./models/book");
const Library = require("./models/library");
Library.hasMany(Book);

const BookRoutes = require("./routes/book-routes");
const LibraryRoutes = require("./routes/library-routes");
const errorController = require("./controllers/error");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(BookRoutes);
app.use(LibraryRoutes);
app.use(errorController.get404);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.error(err));
