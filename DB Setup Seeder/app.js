const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const Associations = require("./models/associations")();
const userRoutes = require("./routes/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(8081);
  });
