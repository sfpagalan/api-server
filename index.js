 'use strict';

require('dotenv').config();
const { sequelize } = require('./src/models/index');
const server = require('./src/server');
const PORT = process.env.PORT || 3001;

sequelize.sync()
  .then(() => {
    server.start(PORT);
  }); 
// this is index.js i used that audrey was saying was needed to be able to start your server - alejandra