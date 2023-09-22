'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const Food = require('../models/food/food.js');
const Clothes = require('../models/clothes/clothes.js');

const SQL_CONNECTION_STRING =
  process.env.SQL_CONNECTION_STRING || 'sqlite:memory';

const sequelize = new Sequelize(SQL_CONNECTION_STRING);

module.exports = {
  sequelize,
  FoodModel: Food(sequelize, DataTypes),
  ClothesModel: Clothes(sequelize, DataTypes),
};