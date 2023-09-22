const express = require('express');
const router = express.Router();
const { Clothes } = require('../models/clothes/clothes');

router.post('/', async (req, res) => {
  try {
    const newClothes = await Clothes.create(req.body);
    res.status(201).json(newClothes);
  } catch (error) {
    res.status(400).json({ error: 'Error: could not create item' });
  }
});

router.get('/', async (req, res) => {
  try {
    const clothes = await Clothes.findAll();
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const clothes = await Clothes.findByPk(req.params.id);
    if (!clothes) {
      res.json(clothes);
    } else {
      res.status(404).json({ error: 'Clothes not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.', message: error.message });  }
});

router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await Clothes.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rowsUpdated === 0) {
      const updatedClothes = await Clothes.findByPk(req.params.id);
      res.json(updatedClothes);
    } else {
      res.status(404).json({ error: 'Clothes not found.' });    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.', message: error.message });  }
});

router.delete('/:id', async (req, res) => {
  try {
    const clothesToDelete = await Clothes.findByPk(req.params.id);

    if (!clothesToDelete) {
      return res.status(404).json({ error: 'Clothes not found.' });
    }

    await clothesToDelete.destroy();
    console.log('Clothes item deleted:', clothesToDelete);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


module.exports = router;
