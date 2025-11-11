const request = require('supertest');
const app = require('../app');

describe('Items API', () => {
  beforeEach(async () => {
    await request(app).post('/items/__reset');
  });

  test('GET / returns API info', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });

  test('POST /items creates item', async () => {
    const res = await request(app).post('/items').send({ name: 'Laptop', qty: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Laptop');
  });

  test('GET /items lists items', async () => {
    await request(app).post('/items').send({ name: 'Book' });
    const res = await request(app).get('/items');
    expect(Array.isArray(res.body)).toBe(true);
  });
});
