const express = require('express');
const router = express.Router();
const Book = require('../models/book/book').Book;
const Collection = require('../models/collection');

// Create a new instance of the Collection class
const bookCollection = new Collection(Book);

// Define your CRUD routes
router.post('/', async (req, res) => {
  try {
    const createdBook = await bookCollection.create(req.body);
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await bookCollection.read();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
