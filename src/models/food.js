const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as needed

const Food = sequelize.define('Food', {
  // Define your model fields here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Food;
