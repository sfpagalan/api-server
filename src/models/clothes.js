const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Clothes = sequelize.define('Clothes', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Clothes;