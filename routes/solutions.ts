import express, { NextFunction } from 'express';
import { Request, Response } from "express";

import { solutions } from '../mocks/solutions';
import { BadRequestError, NotFoundError } from '../models/errors';

const router = express.Router();

 // Получить все решения задания
router.get('/:task_id', (req: Request, res: Response,  next: NextFunction) => {
    try {
        const { task_id }= req.params || {};
        if (!task_id) throw new BadRequestError('Task id is required');
    
        const allSolutions = solutions.filter(solution => Number(solution.task_id) === Number(task_id));
        if (!allSolutions.length) throw new NotFoundError('Solutions not found');
        res.json({ solutions: allSolutions });
    } catch(error) {
        next(error);
    }
})

// Отправить решение задачи
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { solution, user_id, task_id }= req.body || {};
        if (!solution || !user_id || !task_id) {
            throw new BadRequestError('Invalid request');
        }
    
        const newSolution = {
            id: solutions.length + 1,
            user_id,
            task_id,
            solution,
        };
    
        res.json({ solution: newSolution });
    } catch(error) {
        next(error);
    }
})


export default router;