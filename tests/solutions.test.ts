
import  app from '../app'
import request from 'supertest'
import { solutions }  from '../mocks/solutions';

describe('GET /api/solutions/:id', () => {
    it('return data for task 1', async () => {
      const response = await request(app).get(`/api/solutions/1`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.solutions).toBeDefined()
    });
  
    it('return error 404 without solutions', async () => {
      const response = await request(app).get('/api/solutions/9');
      expect(response.statusCode).toBe(404);
    });
});

describe('POST /api/solutions', () => {
    it('return data with new solution', async () => {
        const newSolution = {
            task_id: 1,
            user_id: 1,
            solution: 'New solution',
        };
        const response = await request(app).post(`/api/solutions`).send(newSolution);
  
        expect(response.statusCode).toBe(200);
        expect(response.body.solution).toBeDefined()

    })
})