import { Request, Response } from "express";
import { Comment} from '../models/comment';

const express = require('express');
const router = express.Router();

const commentsList = require('../mocks/comments');


// Список всех комментариев к задаче
router.get('/:task_id', (req: Request, res: Response) => {
    try {
        const { task_id } = req.params || {};
        if (!task_id) {
            res.status(400).json({ error: 'Task id is required' });
            return;
        }
        const taskComments = commentsList.filter((comment: Comment)=> comment.task_id === Number(task_id));
        if (taskComments.length === 0) {
            res.status(404).json({ error: 'Comments not found' });
            return;
        }
        res.json({ comments: taskComments });

    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
})

// Добавить комментарий к задаче
router.post('/', (req: Request, res: Response) => {
    try {
        const { task_id, user_id, content, created_at } = req.body || {};
        if (!task_id || !user_id || !content || !created_at) {
            res.status(400).json({ error: 'Full data required' });
            return;
        }
        const comment = { id: commentsList.length + 1, task_id, user_id, content, created_at };
        res.json({ comments : [ ...commentsList, comment ]});
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
})

// Удалить комментарий к задаче
router.delete('/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params || {};
        if (!id) {
            res.status(400).json({ error: 'Comment id is required' });
            return;
        }
        const newCommentsList = commentsList.filter((comment: Comment) => comment.id !== Number(id));
        res.json({ status: 'ok', comments: newCommentsList });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
})

export default router;