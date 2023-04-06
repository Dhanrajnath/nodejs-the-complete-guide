const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const CashKick = sequelize.define(
  "cash_kick",
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
    status: {
      type: Sequelize.ENUM({
        values: ["failed", "pending", "processing", "completed"],
      }),
      allowNull: false,
    },
    rate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    maturity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    totalReceived: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    totalFinanced: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = CashKick;
