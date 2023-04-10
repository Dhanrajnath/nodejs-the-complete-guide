const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const Associations = require("./models/associations")();

const allRoutes = require("./routes/all-routes");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(allRoutes);

app.use((error, req, res, next) => {
  const { statusCode = 500, message, data } = error;
  res.status(statusCode).json({ message, data });
});

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(8081);
  });
