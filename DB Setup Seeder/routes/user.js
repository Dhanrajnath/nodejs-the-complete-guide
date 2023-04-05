const express = require("express");
const { body } = require("express-validator/check");

const User = require("../models/user");
const userController = require("../controllers/user");

const router = express.Router();

router.post(
  "/user",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        let email = req.body.email;
        return User.findAll({ where: { email: email } }).then((userDoc) => {
          if (userDoc[0]) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("username").trim().not().isEmpty(),
  ],
  userController.signup
);

router.get("/users", userController.getUsers);

router.get("/users/:userId", userController.getUser);

module.exports = router;
