/* eslint-disable no-undef */
const app = require('../app')
const request = require('supertest')
const tasks = require('../mocks/tasks');

describe('GET /api/tasks/', () => {
    it('return all tasks', async () => {
      const response = await request(app).get(`/api/tasks/`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.tasks).toEqual(tasks);
    });
});

describe('GET /api/tasks/:id', () => {
    it('return task 1', async () => {
      const response = await request(app).get(`/api/tasks/1`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.task).toEqual(tasks.find(task => task.id === 1));
    });

    it('return error 404', async () => {
        const response = await request(app).get(`/api/tasks/100`);
    
        expect(response.statusCode).toBe(404);
      });
});

describe('POST /api/tasks', () => {
    const newTask =     {
        id: 3,
        description: "Given a string indicating a range of letters, return a string which includes all the letters in that range, including the last letter. Note that if the range is given in capital letters, return the string in capitals also!",
        incoming_example: "a-z",
        outgoing_example: "abcdefghijklmnopqrstuvwxyz",
        tags: [ '111' ],
        category: 1,
        additional_info: [ 'A hyphen will separate the two letters in the string.', 'You don\'t need to worry about error handling in this kata (i.e. both letters will be the same case and the second letter will not be before the first alphabetically).'],
        score: 7,
        title: 'From A to Z'
    };

    it('add new task', async () => {
      const response = await request(app).post(`/api/tasks`).send(newTask);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.tasks).toEqual([...tasks, newTask]);
    });

    it('return error 404', async () => {
        delete newTask.description;
        const response = await request(app).post(`/api/tasks`).send(newTask);
    
        expect(response.statusCode).toBe(400);
      });
});

describe('DELETE /api/tasks/:id', () => {
    it('delete task 1', async () => {
      const response = await request(app).delete(`/api/tasks/1`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.tasks).toEqual(tasks.filter(task => task.id !== 1));
    });
})


describe('PATCH /api/tasks/:id', () => {
    const newTask =  {
        description: "Given a string indicating a range of letters, return a string which includes all the letters in that range, including the last letter. Note that if the range is given in capital letters, return the string in capitals also!",
    };

    it('update task 1', async () => {
      const response = await request(app).patch(`/api/tasks/1`).send(newTask);

      const updatedTask = tasks.find(task => Number(task.id) === 1);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.task).toEqual({ ...updatedTask, ...newTask});
    });

    it('return error 404', async () => {
        const response = await request(app).patch(`/api/tasks/100`).send(newTask);
    
        expect(response.statusCode).toBe(404);
      });
})
