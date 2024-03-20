
import  app from '../app'
import request from 'supertest'
import { solutions }  from '../mocks/solutions';

describe('GET /api/solutions/:id', () => {
    it('return data for task 1', async () => {
      const taskId = 1
      const response = await request(app).get(`/api/solutions/${taskId}`);
      const taskSolutions = solutions.filter(solution => Number(solution.task_id) === taskId);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.solutions).toEqual(taskSolutions);
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
        const newSolutions = [...solutions, { id: solutions.length +1, ...newSolution }];
  
        expect(response.statusCode).toBe(200);
        expect(response.body.solutions).toEqual(newSolutions);

    })
})