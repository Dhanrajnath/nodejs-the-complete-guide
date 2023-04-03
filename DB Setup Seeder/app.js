require("dotenv").config();
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

sequelize
  .sync()
  //.sync({force:true})
  .then(() => {
    app.listen(3000);
  });

// mongoose
//   .connect(process.env.DATABASE_URL)
//   .then(() => {
//     console.log("Connected!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
