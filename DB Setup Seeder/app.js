const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const User = require("./models/user");
const Associations = require("./models/associations")();

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next(); //---> calling next middleware
    })
    .catch((err) => console.log(err));
});

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        username: "Dhanraj",
        email: "dhanraj@seeder.com",
        password: "seeder123",
      });
    }
    return user;
  })
  .then((user) => {
    app.listen(3000);
  });
