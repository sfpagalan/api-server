const express = require('express');
const app = express();
const cors = require('cors');

// Routes setup
const foodRoutes = require('./routes/rfood');
const clothesRoutes = require('./routes/rclothes');

app.use(express.json());
app.use(cors());

// Use the imported routes
app.use('/food', foodRoutes);
app.use('/clothes', clothesRoutes);

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

app.delete('/clothes/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedClothes = await Clothes.findByPk(id);
    if (!deletedClothes) {
      res.status(404).json({ error: 'Clothes not found' });
    } else {
      await deletedClothes.destroy();
      res.status(200).end();
    }
  } catch (error) {
    next(error);
  }
  res.status(200).json({ message: 'Deleted clothes' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
