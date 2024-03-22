import express, { NextFunction } from 'express';
import { Request, Response } from "express";

import { tasks } from '../mocks/tasks';
import { BadRequestError, NotFoundError } from '../models/errors';
import TasksController from '../controllers/TasksController';

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

router.get("/", TasksController.getTasks)

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
router.get('/:id', TasksController.getTaskById)

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
router.post('/', TasksController.addTask)


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
router.delete('/:id', TasksController.deleteTask)

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

router.patch('/:id', TasksController.updateTask)


export default router;