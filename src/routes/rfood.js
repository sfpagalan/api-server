const express = require('express');
const router = express.Router();
const { Food } = require('../models'); // Check the relative path

router.post('/food', async (req, res, next) => {
  try {
    const newFood = await Food.create(req.body);
    res.status(201).json(newFood);
  } catch (error) {
    next(error);
  }
});

router.get('/food', async (req, res, next) => {
  try {
    const foods = await Food.findAll();
    res.status(200).json(foods);
  } catch (error) {
    next(error);
  }
});

router.get('/food/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const food = await Food.findByPk(id);
    if (!food) {
      res.status(404).json({ error: 'Food not found' });
    } else {
      res.status(200).json(food);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/food/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rowsUpdated, [updatedFood]] = await Food.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rowsUpdated === 0) {
      res.status(404).json({ error: 'Food not found' });
    } else {
      res.status(200).json(updatedFood);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/food/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedFood = await Food.findByPk(id);
    if (!deletedFood) {
      res.status(404).json({ error: 'Food not found' });
    } else {
      await deletedFood.destroy();
      res.status(200).json(deletedFood);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
