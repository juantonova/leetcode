import express from 'express';
import SolutionsController from '../controllers/solutionsController';

const router = express.Router();

/**
 * @swagger
 * /solutions/{task_id}:
 *   get:
 *     summary: Получить все решения задания
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список решений
  *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 solutions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Solution'
 *       400:
 *         description: Task id is required
 *       404:
 *         description: Solutions not found
 */
router.get('/:task_id', SolutionsController.getSolutions)

/**
 * @swagger
 * /solutions:
 *   post:
 *     summary: Отправить решение задачи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               task_id:
 *                 type: integer
 *               solution:
 *                 type: string
 *     responses:
 *       200:
 *         description: Решение добавлено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 solution:
 *                   type: object 
 *                   $ref: '#/components/schemas/Solution'
 *       400:
 *         description: Неверный запрос
 */
router.post('/', SolutionsController.addSolution)


export default router;