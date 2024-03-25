import express from 'express';
import UsersController from '../controllers/usersController';

const usersRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить список всех пользователей
 *     responses:
 *       200:
 *         description: Список всех пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Something went wrong
 */

usersRouter.get('/', UsersController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Получить данные конкретного пользователя
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 *       500:
 *         description: Something went wrong
 */

usersRouter.get('/:id', UsersController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Удалить пользователя
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ид пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string        
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Something went wrong
 */
 

usersRouter.delete('/:id', UsersController.deleteUser)

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Изменить данные пользователя
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: string
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 *       500:
 *         description: Something went wrong
 */

usersRouter.patch('/:id', UsersController.updateUser)

export default usersRouter;