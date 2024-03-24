import app from '../app'
import request from 'supertest'
import { users } from '../mocks/users';

describe('GET /api/users/', () => {
    it('return all users', async () => {
      const response = await request(app).get(`/api/users`);

      const list = users.map(user => ({ id: user.id, name: user.name, rating: user.rating, role: user.role, permissions: user.permissions }));
  
      expect(response.statusCode).toBe(200);
      expect(response.body.users).toBeDefined()
    });
});

describe('GET /api/users/:id', () => {
    it('return user 1', async () => {
      const response = await request(app).get(`/api/users/1`);
      const user = users.find(user => Number(user.id) === 1);
      if (!user) {
        throw new Error('User not found');
      }
      const userData = { id: user.id, name: user.name, rating: user.rating, role: user.role, permissions: user.permissions }
  
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined()
    });

    it('return error 404', async () => {
        const response = await request(app).get(`/api/users/100`);
    
        expect(response.statusCode).toBe(404);
      });
});

describe('DELETE /api/users', () => {
    it('delete user 1', async () => {
      const response = await request(app).delete(`/api/users/1`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.user_id).toBeDefined()
    });
});


describe('PATCH /api/users/:id', () => {
    const updatedData = { rating: 5 };

    it('update user 1', async () => {
      const response = await request(app).patch(`/api/users/1`).send(updatedData);

      const user = users.find(user => Number(user.id) === 1);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined()
    });

    it('return error 404', async () => {
        const response = await request(app).patch(`/api/users/100`).send(updatedData);
    
        expect(response.statusCode).toBe(404);
      });
})