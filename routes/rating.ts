import  express, { NextFunction } from 'express';
import { Request, Response } from "express";

import  { ratings } from '../mocks/rating';
import { BadRequestError, NotFoundError } from '../models/errors';

const router = express.Router();



// Получить оценку задания
router.get('/:task_id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { task_id }= req.params || {};
        if (!task_id) throw new BadRequestError('Task id is required')

        const allRating = ratings.filter(rate => Number(rate.task_id) === Number(task_id));
        if (!allRating.length) throw new NotFoundError('Rating not found');
        const rating = Math.round(allRating.reduce((acc, rate) => acc + rate.rating, 0) / allRating.length);
        res.json({ rating });
    } catch (error) {
        next(error)
    }
})

// Оценить задачу
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { rating, user_id, task_id }= req.body || {};
        if (!rating || !user_id || !task_id) throw new BadRequestError('Invalid request')

        const newRating = {
            id: ratings.length + 1,
            user_id,
            task_id,
            rating,
        };
        res.json({ rating: [...ratings, newRating] });
    } catch (error) {
       next(error)
    }

})

export default router;