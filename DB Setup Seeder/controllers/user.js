const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        username: username,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created!", data: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      if (users.length === 0) {
        const error = new Error("No users found!!");
        error.statusCode = 200;
        throw error;
      }
      res.status(200).json({ data: users });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findAll({ where: { id: userId } })
    .then((user) => {
      if (user.length === 0) {
        const error = new Error(`No users found with this id: ${userId}`);
        error.statusCode = 200;
        throw error;
      }
      res.status(200).json({ data: user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
