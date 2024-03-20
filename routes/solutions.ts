import express from 'express';
import { Request, Response } from "express";

import { solutions } from '../mocks/solutions';

const router = express.Router();

 // Получить все решения задания
router.get('/:task_id', (req: Request, res: Response) => {
    try {
        const { task_id }= req.params || {};
        if (!task_id) {
            res.status(400).json({ error: 'Task id is required' });
            return;
        }
    
        const allSolutions = solutions.filter(solution => Number(solution.task_id) === Number(task_id));
        if (allSolutions.length === 0) {
            res.status(404).json({ error: 'Solutions are not found' });
            return;
        }
    
        res.json({ solutions: allSolutions });
    } catch(error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
})

// Отправить решение задачи
router.post('/', (req: Request, res: Response) => {
    try {
        const { solution, user_id, task_id }= req.body || {};
        if (!solution || !user_id || !task_id) {
            res.status(400).json({ error: 'Full data is required' });
            return;
        }
    
        const newSolution = {
            id: solutions.length + 1,
            user_id,
            task_id,
            solution,
        };
    
        res.json({ solutions: [ ...solutions, newSolution] });
    } catch(error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
})


export default router;