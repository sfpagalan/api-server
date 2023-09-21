const request = require('supertest');
const app = require('../src/server');
const { Food, Clothes } = require('../src/models');

describe('API Endpoints', () => {
  beforeAll(async () => {
    // Set up any data or environment before each test
    await Food.sync({ force: true });
    await Clothes.sync({ force: true });
  });

  afterAll(async () => {
    // Clean up any remaining test data or environment after running the tests
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
    const response = await request(app).delete('/clothes/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

});
