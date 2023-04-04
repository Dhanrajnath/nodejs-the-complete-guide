const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    perPayment: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    termLength: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    paymentAmount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Contract;
