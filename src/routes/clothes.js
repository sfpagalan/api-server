const express = require('express');
const router = express.Router();
const { Clothes } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const newClothes = await Clothes.create(req.body);
    res.status(201).json(newClothes);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const clothes = await Clothes.findAll();
    res.status(200).json(clothes);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const clothes = await Clothes.findByPk(id);
    if (!clothes) {
      res.status(404).json({ error: 'Clothes not found' });
    } else {
      res.status(200).json(clothes);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rowsUpdated, [updatedClothes]] = await Clothes.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rowsUpdated === 0) {
      res.status(404).json({ error: 'Clothes not found' });
    } else {
      res.status(200).json(updatedClothes);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedClothes = await Clothes.findByPk(id);
    if (!deletedClothes) {
      res.status(404).json({ error: 'Clothes not found' });
    } else {
      await deletedClothes.destroy();
      res.status(200).json(deletedClothes);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
