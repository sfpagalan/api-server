const { Sequelize } = require('sequelize');

const config = {
  "database": "apiServer",
  "username": "ryomazen",
  "password": "coolcats",
  "host": "localhost",
  "dialect": "postgres"
};
console.log('Config:', config);

const sequelize = new Sequelize(config);

module.exports = sequelize;
