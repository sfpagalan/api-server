const express = require('express');
const router = express.Router();
const Author = require('../models/author/author').Author;
const Collection = require('../models/collection');

// Create a new instance of the Collection class
const authorCollection = new Collection(Author);

// Define your CRUD routes
router.post('/', async (req, res) => {
  try {
    const createdAuthor = await authorCollection.create(req.body);
    res.status(201).json(createdAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const authors = await authorCollection.read();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
