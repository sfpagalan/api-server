'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

// Routes setup
const foodRoutes = require('./routes/food');
const clothesRoutes = require('./routes/clothes');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/author');

app.use(express.json());
app.use(cors());

// Use the imported routes
app.use('/food', foodRoutes);
app.use('/clothes', clothesRoutes);
app.use('/books', booksRouter);
app.use('/author', authorsRouter);


// Error handling middleware
app.use(require('./error-handlers/404'));
app.use(require('./error-handlers/500'));

// Start the server
module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log('Server is running on port ::', PORT);
    });
  },
};