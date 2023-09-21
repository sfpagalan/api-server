const Sequelize = require('sequelize');
const config = require('../../config/config.json');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const FoodModel = require('./food');
const ClothesModel = require('./clothes');

const Food = FoodModel(sequelize, Sequelize);
const Clothes = ClothesModel(sequelize, Sequelize);


module.exports = {
  Food,
  Clothes,
  sequelize,
};
