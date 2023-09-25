'use strict';

const express = require('express');
const router = express.Router();
const { FoodModel } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name || !type) {
      return res.status(400).json({ error: 'Both name and type are required.' });
    }
    const newFood = await FoodModel.create({ name, type });
    res.status(200).json(newFood);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data' });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const foods = await FoodModel.findAll();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const food = await FoodModel.findByPk(req.params.id);
    if (!food) {
      res.json(food);
    } else {
      res.status(200).json(food);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, type } = req.body;
    const { id } = req.params;

    console.log('Updating food item with ID:', id);

    if (!name || !type) {
      return res.status(400).json({ error: 'Both name and type are required for updating.' });
    }

    const [rowsUpdated] = await FoodModel.update(
      { name, type },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );

    console.log('Rows updated:', rowsUpdated);

    if (rowsUpdated === 0) {
      res.status(404).json({ error: 'Food not found.' });
    } else {
      const updatedFood = await FoodModel.findByPk(id);
      console.log('Updated food item:', updatedFood);
      res.json(updatedFood);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedFood = await FoodModel.destroy({
      where: { id: req.params.id },
    });
    if (deletedFood === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Food not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

module.exports = router;
