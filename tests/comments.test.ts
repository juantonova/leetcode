import app from '../app';
import  request  from 'supertest';
import { comments } from '../mocks/comments'

describe('GET /api/comments/:id', () => {
  it('return data for task 1', async () => {
    const taskId = 1
    const response = await request(app).get(`/api/comments/${taskId}`);
    const taskComments = comments.filter(comment => comment.task_id === taskId);

    expect(response.statusCode).toBe(200);
    expect(response.body.comments.length).toBe(taskComments.length);
  });

  it('return error 404 without comments', async () => {
    const response = await request(app).get('/api/comments/8');
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /api/comments/', () => {
  it('return data with newTask', async () => {
    const newComment = {
      task_id: 1,
      user_id: 1,
      content: 'New comment',
      created_at: new Date().toISOString(),
    };
    
    const response = await request(app).post(`/api/comments`).send(newComment);
    const commentsList = [...comments, { id: comments.length +1, newComment }];

    expect(response.statusCode).toBe(200);
    expect(response.body.comments.length).toBe(commentsList.length);
  });

  it('return error 400 with invalid data', async () => {
    const newComment = {
      user_id: 1,
      content: 'New comment',
      created_at: new Date().toISOString(),
    };
    const response = await request(app).post('/api/comments').send(newComment);
    expect(response.statusCode).toBe(400);
  });
});


describe('DELETE /api/comments/:id', () => {
  it('return data with comment 1', async () => {
    const response = await request(app).delete(`/api/comments/1`);

    expect(response.statusCode).toBe(200);
    expect(response.body.comments.length).toBe(comments.length - 1);
  });


});

