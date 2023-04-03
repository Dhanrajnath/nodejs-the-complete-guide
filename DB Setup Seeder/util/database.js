const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  `mysql://springstudent:springstudent@127.0.0.1:3306/seeder`
);

module.exports = sequelize;
