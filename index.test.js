const request = require('supertest');
const express = require('express');
const app = require('./index'); // assuming your server exports `app` instead of calling listen

describe('NASA API Routes', () => {
  test('GET /api/nasa?type=apod should return Astronomy Picture of the Day data', async () => {
    const res = await request(app).get('/api/nasa?type=apod');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title');
  });

  test('GET /api/nasa?type=mars should return Mars Rover Photos', async () => {
    const res = await request(app).get('/api/nasa?type=mars');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('photos');
  });

  test('GET /api/nasa?type=epic should return EPIC Earth images', async () => {
    const res = await request(app).get('/api/nasa?type=epic');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/nasa?type=neo should return Near Earth Objects data', async () => {
    const res = await request(app).get('/api/nasa?type=neo');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('near_earth_objects');
  });

  test('GET /api/nasa?type=nasa_image should return image data', async () => {
    const res = await request(app).get('/api/nasa?type=nasa_image');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('collection');
  });

  test('GET /api/nasa?type=invalid should return 400', async () => {
    const res = await request(app).get('/api/nasa?type=invalid');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
