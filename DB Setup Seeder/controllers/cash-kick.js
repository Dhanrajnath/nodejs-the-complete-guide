const { validationResult } = require("express-validator/check");

const CashKick = require("../models/cashKick");
const User = require("../models/user");
const Contract = require("../models/contract");
const UserContract = require("../models/userContract");

exports.createCashkick = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const selectedContracts = JSON.parse(req.body.selectedContracts);
  if (selectedContracts.length < 1) {
    const error = new Error("no contracts selected, please select a contract");
    error.statusCode = 404;
    throw error;
  }

  //checking contract exists!
  selectedContracts.map((contract) => {
    Contract.findByPk(contract.contractId)
      .then((contract) => {
        if (contract == null) {
          const error = new Error("failed to fetch one of the contract id");
          error.statusCode = 404;
          throw error;
        }
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });

  const userId = req.body.userId;

  User.findByPk(userId)
    .then((user) => {
      if (user === null) {
        const error = new Error("user not found.");
        error.statusCode = 404;
        throw error;
      }
      const termMonths = req.body.term.split(" ")[0];

      const cashkick = new CashKick({
        name: req.body.name,
        status: "pending",
        rate: req.body.rate,
        maturity: termMonths == "12" ? "Apr 06, 2024" : "Oct 06, 2023",
        totalReceived: req.body.totalPayout,
        totalFinanced: req.body.paybackAmount,
        user_id: user.id,
      });
      cashkick.save().then((result) => {
        const cashKickId = result.id;
        selectedContracts.map((contract) => {
          const userContract = new UserContract({
            user_id: userId,
            cash_kick_id: cashKickId,
            contract_id: contract.contractId,
          });
          return userContract.save().then(() => {
            res
              .status(201)
              .json({ message: "cashkick created!", data: result });
          });
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCashKicks = async (req, res, next) => {
  const response = [];
  let selectedContracts;

  let cashkicks = await CashKick.findAll({ where: { user_id: req.user.id } });

  cashkicks = cashkicks.map((cashkick) => cashkick.toJSON());

  const promises = cashkicks.map(async (cashkick) => {
    let userContract = await UserContract.findAll({
      where: { user_id: req.user.id, cash_kick_id: cashkick.id },
      include: { model: Contract },
    });

    userContract = userContract.map((p) => p.toJSON());
    selectedContracts = userContract.map((user) => ({ ...user.contract }));
    response.push({
      ...cashkick,
      selectedContracts: JSON.stringify(selectedContracts),
    });
  });
  await Promise.all(promises);
  res.status(201).json({ data: response });
};
