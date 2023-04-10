const { validationResult } = require("express-validator/check");

const Contract = require("../models/contract");

exports.addContract = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const contractName = req.body.contractName;
  const contractType = req.body.contractType;
  const perPayment = req.body.perPayment;
  const termLength = req.body.termLength;
  const paymentAmount = req.body.paymentAmount;

  const contract = new Contract({
    name: contractName,
    contractType: contractType,
    perPayment: perPayment,
    termLength: termLength,
    paymentAmount: paymentAmount,
  });
  contract
    .save()
    .then((contract) => {
      if (contract == null) {
        const error = new Error("creating a contract failed!");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
      res.status(201).json({ message: "Contract added!", data: contract });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getContracts = (req, res, next) => {
  Contract.findAll()
    .then((contracts) => {
      if (contracts.length === 0) {
        const error = new Error("No contracts found!!");
        error.statusCode = 200;
        throw error;
      }
      res.status(200).json({ data: contracts });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
