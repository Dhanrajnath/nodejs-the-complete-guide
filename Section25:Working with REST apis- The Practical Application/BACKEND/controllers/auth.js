const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const fs = require("fs");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  //encrypt the password
  bcrypt
    .hash(password, 12)
    .then((hashedPassowrd) => {
      const user = new User({
        email: email,
        name: name,
        password: hashedPassowrd,
      });
      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "user creation success!!", userId: result._id });
    })
    .catch((error) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
