import express from 'express';
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
 *         description: Something went wrong
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
 *           type: string
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
 *                   items:
 *                     $ref: '#/components/schemas/Task'
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
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               incoming_example:
 *                 type: string
 *               outgoing_example:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                type: string
 *               additional_info:
 *                type: string
 *               score:
 *                type: number
 *     responses:
 *       200:
 *         description: Данные задачи
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: object 
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Something went wrong
 */
router.post('/', TasksController.addTask)


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Удалить задачу
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID задачи
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Данные задачи
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task_id:
 *                   type: string
 *       400:
 *         description: Task id is required
 *       500:
 *         description: Something went wrong
 */
router.delete('/:id', TasksController.deleteTask)

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Изменить задачу
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID задачи
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               incoming_example:
 *                 type: string
 *               outgoing_example:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items: 
 *                    type: string
 *               category:
 *                type: string
 *               additional_info:
 *                type: string
 *               score:
 *                type: number
 *     responses:
 *       200:
 *         description: Данные задачи
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: object
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Task id is required
 *       404:
 *         description: Task not found
 *       500:
 *         description: Something went wrong
 */

router.patch('/:id', TasksController.updateTask)


export default router;