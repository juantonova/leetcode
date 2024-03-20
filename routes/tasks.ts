import express from 'express';
import { Request, Response } from "express";

import { tasks } from '../mocks/tasks';

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

router.get("/", (_, res: Response) => {
    try {
        res.json({ tasks });
    } catch(error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
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
 *       404:
 *         description: Задача не найдена
 *       500:
 *        description: Ошибка сервера
 */
router.get('/:id', (req: Request, res: Response) => {
    try {
        const { id }= req.params || {};
        if (!id) {
            res.status(400).json({ error: 'Task id is required' });
            return;
        }
        const task = tasks.find(task => Number(task.id) === Number(id));
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.json({ task });
    } catch(error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
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
 *         description: Не все данные переданы
 *       500:
 *        description: Ошибка сервера
 */
router.post('/', (req: Request, res: Response) => {
    try {
        const { description, incoming_example, outgoing_example, tags, category, additional_info, score, title } = req.body || {};
        if (!description || !incoming_example || !outgoing_example || !tags || !category || !additional_info || !score || !title) {
            res.status(400).json({ error: 'Full data required' });
            return;
        }
    
        const newTask = { id: tasks.length + 1, ...req.body };
        res.json({ tasks: [...tasks, newTask]}); 
    } catch(error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
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
 *         description: Не все данные переданы
 *       500:
 *        description: Ошибка сервера
 */
router.delete('/:id', (req: Request, res: Response) => {
    try {
        const { id }= req.params || {};
        if (!id) {
            res.status(400).json({ error: 'Task id is required' });
            return;
        }
        const newTasks = tasks.filter(task => Number(task.id) !== Number(id));
        res.json({ status: 'ok', tasks: newTasks });
    } catch(error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
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
 *       404:
 *         description: Задача не найдена
 *       500:
 *        description: Ошибка сервера
 */

router.patch('/:id', (req: Request, res: Response) => {
    try {
        const { task: updatedTask } = req.body || {};
        const { id }= req.params || {};
        if (!id) {
            res.status(400).json({ error: 'Task id is required' });
            return;
        }

        const task = tasks.find(task => Number(task.id) === Number(id));
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        const newTask = { ... task, ...updatedTask}
        res.json({ status: 'ok', task: newTask });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
})


export default router;