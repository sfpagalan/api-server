const express = require('express');
// const request = require('supertest');
// const { Food, Clothes, sequelize } = require('../src/models');
const { app } = require('../src/models/index');
const supertest = require('supertest');
const request = supertest(app);
const { sequelize } = require('../src/models/index');

// const app = express();
// const request = supertest(app);

describe('API Endpoints', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should connect to the database', async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      throw new Error(`Unable to connect to the database: ${error}`);
    }
  });  

  // Tests for the Food model
  it('should create a new food record', async () => {
    const newFoodData = {
      name: 'Pizza',
      type: 'Italian',
    };

    const response = await request(app)
      .post('/food')
      .send(newFoodData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newFoodData.name);
    expect(response.body.type).toBe(newFoodData.type);

    const createdFood = await Food.findByPk(response.body.id);
    expect(createdFood).toBeTruthy();
  });

  it('should get all food records', async () => {
    const response = await request(app).get('/food');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a specific food record by ID', async () => {
    const response = await request(app).get('/food/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('should update a food record by ID', async () => {
    const updatedFoodData = {
      name: 'Updated Pizza',
      type: 'Italian',
    };

    const response = await request(app)
      .put('/food/1')
      .send(updatedFoodData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.name).toBe(updatedFoodData.name);
  });

  it('should delete a food record by ID', async () => {
    const response = await request(app).delete('/food/1');
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  // Tests for the Clothes model
  it('should create a new clothes record', async () => {
    const newClothesData = {
      name: 'Shirt',
      size: 'M',
      color: 'Blue',
    };

    const response = await request(app)
      .post('/clothes')
      .send(newClothesData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newClothesData.name);
    expect(response.body.size).toBe(newClothesData.size);
    expect(response.body.color).toBe(newClothesData.color);

    const createdClothes = await Clothes.findByPk(response.body.id);
    expect(createdClothes).toBeTruthy();
  });

  it('should get all clothes records', async () => {
    const response = await request(app).get('/clothes');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a specific clothes record by ID', async () => {
    const response = await request(app).get('/clothes/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('should update a clothes record by ID', async () => {
    const updatedClothesData = {
      name: 'Updated Shirt',
      size: 'L',
      color: 'Red',
    };

    const response = await request(app)
      .put('/clothes/1')
      .send(updatedClothesData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.name).toBe(updatedClothesData.name);
  });

  it('should delete a clothes record by ID', async () => {
    const response = await request.delete('/clothes/1');
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });
});
