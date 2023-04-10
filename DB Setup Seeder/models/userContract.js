const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const UserContract = sequelize.define(
  "user_contract",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = UserContract;
