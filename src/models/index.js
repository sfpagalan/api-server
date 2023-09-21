const path = require('path');
const express = require('express');
const sequelize = require('../../config/config.js');

const app = express();

const FoodModel = require('./food.js');
const Food = FoodModel(sequelize);

const ClothesModel = require('./clothes.js');
const Clothes = ClothesModel(sequelize);

const foodRoutes = require('../routes/rfood');
const clothesRoutes = require('../routes/rclothes');

// Register the routes
app.use('/rfood', foodRoutes);
app.use('/rclothes', clothesRoutes);

app.delete('/clothes/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedClothes = await Clothes.findByPk(id);
      if (!deletedClothes) {
        res.status(404).json({ error: 'Clothes not found' });
      } else {
        await deletedClothes.destroy();
        res.status(204).end();
      }
    } catch (error) {
      next(error);
    }
    res.status(200).json({ message: 'Deleted clothes' });
  });

module.exports = {
  Food,
  Clothes,
  sequelize,
  app,
};
