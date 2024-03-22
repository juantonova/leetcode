import { NextFunction, Request, Response } from "express";
import { Comment} from '../models/comment';

import express from 'express';
const router = express.Router();

import { comments } from '../mocks/comments';
import { BadRequestError, NotFoundError } from "../models/errors";
import CommentsController from "../controllers/CommentsController";


// Список всех комментариев к задаче
router.get('/:task_id', CommentsController.getComments)

// Добавить комментарий к задаче
router.post('/', CommentsController.addComment)

// Удалить комментарий к задаче
router.delete('/:id', CommentsController.deleteComment)

export default router;