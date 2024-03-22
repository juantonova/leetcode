import { NextFunction, Request, Response } from "express";
import { Comment} from '../models/comment';

import express from 'express';
const router = express.Router();

import { comments } from '../mocks/comments';
import { BadRequestError, NotFoundError } from "../models/errors";


// Список всех комментариев к задаче
router.get('/:task_id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { task_id } = req.params || {};
        if (!task_id) throw new BadRequestError('Task id is required');
        const taskComments = comments.filter((comment: Comment)=> comment.task_id === Number(task_id));
        if (!taskComments.length) throw new NotFoundError('Comments not found');
        res.json({ comments: taskComments });
    } catch (error) {
        next(error)
    }
})

// Добавить комментарий к задаче
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { task_id, user_id, content, created_at } = req.body || {};
        if (!task_id || !user_id || !content || !created_at) {
            throw new BadRequestError('Invalid request');
        }
        const comment = { id: comments.length + 1, task_id, user_id, content, created_at };
        res.json({ comment });
    } catch (error) {
        next(error)
    }
})

// Удалить комментарий к задаче
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params || {};
        if (!id) throw new BadRequestError('Task id is required');
        const newComments = comments.filter((comment: Comment) => comment.id !== Number(id));
        res.json({ comment_id: id });
    } catch (error) {
        next(error)
    }
})

export default router;