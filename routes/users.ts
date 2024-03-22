import express from 'express';
import { users } from '../mocks/users';
import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../models/errors';
import UsersController from '../controllers/UsersController';

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
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Users not found
 *       500:
 *         description: Something went wrong
 */

usersRouter.get('/:id', UsersController.getUserById);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Удалить пользователя
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 user_id:
 *                   type: integer
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Something went wrong
 */
 

usersRouter.delete('/:id', UsersController.deleteUser)

/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: Изменить данные пользователя
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
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