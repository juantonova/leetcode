import  express, { NextFunction } from 'express';
import { Request, Response } from "express";

import  { ratings } from '../mocks/rating';
import { BadRequestError, NotFoundError } from '../models/errors';
import RatingController from '../controllers/RatingController';

const router = express.Router();



// Получить оценку задания
router.get('/:task_id', RatingController.getRatingByTaskId)

// Оценить задачу
router.post('/', RatingController.addRating)

export default router;