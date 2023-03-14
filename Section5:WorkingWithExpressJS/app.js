const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("This will always run!!");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("In the middleware!");
  res.send(`<h1>The "Add Product" Page</h1>`);
  //   next(); // Allows the request to continue to the next middleware in-line
});

app.use((req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello from Express!</h1>");
  // respond here ...
});

app.listen(3000);
