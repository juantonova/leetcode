import express, { NextFunction } from 'express';
import { Request, Response } from "express";

import { tasks } from '../mocks/tasks';
import { BadRequestError, NotFoundError } from '../models/errors';

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Получить список всех задач
 *     responses:
 *       200:
 *         description: Список всех задач
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       500:
 *         description: Ошибка сервера
 */

router.get("/", (_, res: Response, next: NextFunction) => {
    try {
        res.json({ tasks });
    } catch(error) {
        next(error)
    }
})

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Получить задачу по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID задачи
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные задачи
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: '#/components/schemas/Task'
 *       400:
 *         description: Task id is required
 *       404:
 *         description: Task not found
 *       500:
 *         description: Something went wrong
 */
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id }= req.params || {};
        if (!id) throw new BadRequestError('Task id is required');
        const task = tasks.find(task => Number(task.id) === Number(id));
        if (!task) throw new NotFoundError('Task not found');
        res.json({ task });
    } catch(error) {
        next(error)
    }
})

/**
 * @swagger
 * /tasks/{id}:
 *   post:
 *     summary: Добавить задачу
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID задачи
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные задачи
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:  '#/components/schemas/Task'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Something went wrong
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { description, incoming_example, outgoing_example, tags, category, additional_info, score, title } = req.body || {};
        if (!description || !incoming_example || !outgoing_example || !tags || !category || !additional_info || !score || !title) {
            throw new BadRequestError('Invalid request');
        }
    
        const newTask = { id: tasks.length + 1, ...req.body };
        res.json({ task: newTask }); 
    } catch(error) {
        next(error);
    }
})


/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Удалить задачу
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID задачи
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные задачи
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:  '#/components/schemas/Task'
 *                 status: 
 *                   type: string
 *       400:
 *         description: Task id is required
 *       500:
 *         description: Something went wrong
 */
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id }= req.params || {};
        if (!id) throw new BadRequestError('Task id is required');
        const newTasks = tasks.filter(task => Number(task.id) !== Number(id));
        res.json({ task_id: id });
    } catch(error) {
        next(error)
    }
})

/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: Изменить задачу
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID задачи
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные задачи
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type:  '#/components/schemas/Task'
 *                 status: 
 *                   type: string
 *       400:
 *         description: Task id is required
 *       404:
 *         description: Task not found
 *       500:
 *         description: Something went wrong
 */

router.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { task: updatedTask } = req.body || {};
        const { id }= req.params || {};
        if (!id) throw new BadRequestError('Task id is required');

        const task = tasks.find(task => Number(task.id) === Number(id));
        if (!task) throw new NotFoundError('Task not found');

        const newTask = { ... task, ...updatedTask}
        res.json({ task: newTask });
    } catch (error) {
        next(error)
    }
})


export default router;