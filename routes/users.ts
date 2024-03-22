import express from 'express';
import { users } from '../mocks/users';
import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../models/errors';

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

usersRouter.get('/', (_, res: Response, next) => {
    const list = users.map(user => ({ id: user.id, name: user.name, rating: user.rating, role: user.role, permissions: user.permissions }));
    try {
        res.json({ users: [...list] });
    } catch (error) {
        next(error)
    }
})

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

usersRouter.get('/:id', (req: Request, res: Response, next) => {
    try {
        const { id } = req.params || {};
        if (!id) throw new BadRequestError('Invalid request');
    const user = users.find(user => Number(user.id) === Number(id));
    if (!user) throw new NotFoundError('User not found');
    const userData = { id: user.id, name: user.name, rating: user.rating, role: user.role, permissions: user.permissions }
    res.json({ user: userData });
    } catch (error) {
        next(error)
    }
})

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
 

usersRouter.delete('/:id', (req: Request, res: Response, next) => {
    try {
        const { id }= req.params || {};
        if (!id) throw new BadRequestError('Invalid request');
        const newUsers = users.filter(user => Number(user.id) !== Number(id));
        res.json({ status: 'ok', user_id: id, });
    } catch (error) {
        next(error);
    }
})

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

usersRouter.patch('/:id', (req: Request, res: Response, next) => {
    try {
        const { rating } = req.body || {};
        const { id } = req.params || {};
        if (!id) throw new BadRequestError('Invalid request');
    
        const user = users.find(user => Number(user.id) === Number(id));
        if (!user) throw new NotFoundError('User not found');
    
        const newUser = { ...user, rating }
        res.json({ status: 'ok', user: newUser});   
    } catch(error) {
        next(error);
    }
})

export default usersRouter;