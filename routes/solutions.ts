import express, { NextFunction } from 'express';
import { Request, Response } from "express";

import { solutions } from '../mocks/solutions';
import { BadRequestError, NotFoundError } from '../models/errors';
import SolutionsController from '../controllers/SolutionsController';

const router = express.Router();

 // Получить все решения задания
router.get('/:task_id', SolutionsController.getSolutions)

// Отправить решение задачи
router.post('/', SolutionsController.addSolution)


export default router;