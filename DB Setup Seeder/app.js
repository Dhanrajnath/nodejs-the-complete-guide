const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const Associations = require("./models/associations")();

const userRoutes = require("./routes/user");
const paymentRoutes = require("./routes/payment");
const contractRoutes = require("./routes/contract");
const cashkickRoutes = require("./routes/cash-kick");
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

app.use(userRoutes);
app.use(paymentRoutes);
app.use(contractRoutes);
app.use(cashkickRoutes);

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
