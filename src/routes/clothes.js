'use strict';

const express = require('express');
const router = express.Router();
const { ClothesModel } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name || !type) {
      return res.status(400).json({ error: 'Both name and type are required.' });
    }
    const newClothes = await ClothesModel.create(req.body);
    res.status(201).json(newClothes);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data' });
  }
});

router.get('/', async (req, res) => {
  try {
    const clothes = await ClothesModel.findAll();
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const clothes = await ClothesModel.findByPk(req.params.id);
    if (!clothes) {
      res.json(clothes);
      // res.status(404).json({ error: 'Clothes not found' });
    } else {
      res.status(200).json(clothes);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.', message: error.message });  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, type } = req.body;
    const { id } = req.params;

    console.log('Updating clothes item with ID:', id);

    if (!name || !type) {
      return res.status(404).json({ error: 'Both name and type are required for updating.' });
    }

    const [rowsUpdated] = await ClothesModel.update(
      { name, type },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );

    if (rowsUpdated === 0) {
      res.status(404).json({ error: 'Clothes not found.' });    
    } else {
      const updatedClothes = await ClothesModel.findByPk(id);
      res.json(updatedClothes);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.', message: error.message });  }
});

router.delete('/:id', async (req, res) => {
  try {
    const clothesToDelete = await ClothesModel.findByPk(req.params.id);

    if (!clothesToDelete) {
      return res.status(404).json({ error: 'Clothes not found.' });
    }

    await clothesToDelete.destroy();
    console.log('Clothes item deleted:', clothesToDelete);
    res.status(204).json(clothesToDelete);  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


module.exports = router;
