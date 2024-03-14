/* eslint-disable no-undef */
const app = require('../app')
const request = require('supertest')
const users = require('../mocks/users');
const usersList = require('../mocks/users');

describe('GET /api/users/', () => {
    it('return all users', async () => {
      const response = await request(app).get(`/api/users`);

      const list = usersList.map(user => ({ id: user.id, name: user.name, rating: user.rating, role: user.role, permissions: user.permissions }));
  
      expect(response.statusCode).toBe(200);
      expect(response.body.users).toEqual(list);
    });
});

describe('GET /api/users/:id', () => {
    it('return user 1', async () => {
      const response = await request(app).get(`/api/users/1`);
      const user = users.find(user => Number(user.id) === 1);
      const userData = { id: user.id, name: user.name, rating: user.rating, role: user.role, permissions: user.permissions }
  
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toEqual(userData);
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
      expect(response.body.user_id).toEqual('1');
    });
});


describe('PATCH /api/users/:id', () => {
    const updatedData = { rating: 5 };

    it('update user 1', async () => {
      const response = await request(app).patch(`/api/users/1`).send(updatedData);

      const user = users.find(user => Number(user.id) === 1);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toEqual({...user, ...updatedData});
    });

    it('return error 404', async () => {
        const response = await request(app).patch(`/api/users/100`).send(updatedData);
    
        expect(response.statusCode).toBe(404);
      });
})