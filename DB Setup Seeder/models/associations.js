const User = require("../models/user");
const CashKick = require("../models/cashKick");
const Payment = require("../models/payment");
const Contract = require("../models/contract");
const UserContract = require("../models/userContract");

module.exports = function () {
  User.hasMany(CashKick, { foreignKey: "user_id", sourceKey: "id" });
  CashKick.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id",
    constraints: true,
    onDelete: "CASCADE",
  });

  CashKick.hasMany(Payment, { foreignKey: "cash_kick_id", sourceKey: "id" });
  Payment.belongsTo(CashKick, { foreignKey: "cash_kick_id", targetKey: "id" });

  User.hasMany(UserContract, { foreignKey: "user_id", sourceKey: "id" });
  Contract.hasMany(UserContract, {
    foreignKey: "contract_id",
    sourceKey: "id",
  });
  CashKick.hasMany(UserContract, {
    foreignKey: "cash_kick_id",
    sourceKey: "id",
  });

  UserContract.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
  UserContract.belongsTo(Contract, {
    foreignKey: "contract_id",
    targetKey: "id",
  });
  UserContract.belongsTo(CashKick, {
    foreignKey: "cash_kick_id",
    targetKey: "id",
  });
};
