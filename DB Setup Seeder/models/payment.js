const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    dueDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expectedAmount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    outstandingAmount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Payment;
