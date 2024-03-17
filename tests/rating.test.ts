/* eslint-disable no-undef */
import app from '../app'
import  request from 'supertest';
import { ratingsList } from '../mocks/rating';

describe('GET /api/rating/:task_id', () => {
    it('return rating for task 2', async () => {
        const response = await request(app).get('/api/rating/2');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ rating: 2 });
    });
  
    it('return error 404 without rating', async () => {
      const response = await request(app).get('/api/rating/8');
      expect(response.statusCode).toBe(404);
    });
  })
  
  describe('POST /api/rating/', () => {
    const newRating = {
      user_id: 5,
      task_id: 2,
      rating: 3,
  };
  
    it('return rating for new task', async () => {
        const response = await request(app).post('/api/rating/').send(newRating);
        expect(response.status).toBe(200);
        expect(response.body.rating.length).toEqual(ratingsList.length + 1);
    });
  
  })