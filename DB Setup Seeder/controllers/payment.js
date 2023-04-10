const { validationResult } = require("express-validator/check");

const Payment = require("../models/payment");

exports.addPayment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const dueDate = req.body.dueDate;
  const status = req.body.status;
  const expectedAmount = req.body.expectedAmount;
  const outstanding = req.body.outstanding;
  const cashKickId = req.body.cashKickId;

  const payment = new Payment({
    dueDate: dueDate,
    status: status,
    expectedAmount: expectedAmount,
    outstandingAmount: outstanding,
    cash_kick_id: cashKickId,
  });
  payment
    .save()
    .then((payment) => {
      res.status(201).json({ message: "Payment added!", data: payment });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPayments = (req, res, next) => {
  Payment.findAll()
    .then((payments) => {
      if (payments.length === 0) {
        const error = new Error("No payments found!!");
        error.statusCode = 200;
        throw error;
      }
      res.status(200).json({ data: payments });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
