const { validationResult } = require("express-validator/check");

const CashKick = require("../models/cashKick");
const User = require("../models/user");
const Contract = require("../models/contract");

exports.createCashkick = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const userId = req.body.userId;
  if (!userId) {
    const error = new Error("user id is not provided");
    error.statusCode = 404;
    throw error;
  }
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("user not found");
        error.statusCode = 404;
        throw error;
      }
      const cashkick = new CashKick({
        name: req.body.name,
        status: req.body.status,
        maturity: req.body.maturity,
        totalReceived: req.body.totalReceived,
        totalFinanced: req.body.totalFinanced,
        user_id: user.id,
      });
      cashkick
        .save()
        .then((result) => {
          res.status(201).json({ message: "cashkick created!", data: result });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

  const cashkick = new CashKick({});
};
