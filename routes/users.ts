import express from 'express';
import { usersList } from '../mocks/users';
import { Request, Response } from 'express';

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
 */

usersRouter.get('/', (_, res: Response) => {
    const list = usersList.map(user => ({ id: user.id, name: user.name, rating: user.rating, role: user.role, permissions: user.permissions }));
    try {
        res.json({ users: [...list] });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
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
 *       404:
 *         description: Пользователь не найден
 */

usersRouter.get('/:id', (req: Request, res: Response) => {
    try {
        const { id }= req.params || {};
    if (!id) {
        res.status(400).json({ error: 'User id is required' });
        return;
    }
    const user = usersList.find(user => Number(user.id) === Number(id));
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    const userData = { id: user.id, name: user.name, rating: user.rating, role: user.role, permissions: user.permissions }
    res.json({ user: userData });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
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
 *       500:
 *         description: Внутренняя ошибка сервера
 */

usersRouter.delete('/:id', (req: Request, res: Response) => {
    try {
        const { id }= req.params || {};
        if (!id) {
            res.status(400).json({ error: 'User id is required' });
            return;
        }
        const newUsersList = usersList.filter(user => Number(user.id) !== Number(id));
        res.json({ status: 'ok', user_id: id, users: newUsersList});
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
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
 *       500:
 *         description: Внутренняя ошибка сервера
 *     404:
 *        description: Пользователь не найден
 */

usersRouter.patch('/:id', (req: Request, res: Response) => {
    try {
        const { rating } = req.body || {};
        const { id }= req.params || {};
        if (!id) {
            res.status(400).json({ error: 'User id is required' });
            return;
        }
    
        const user = usersList.find(user => Number(user.id) === Number(id));
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
    
        const newUser ={ ...user, rating}
        res.json({ status: 'ok', user: newUser});   
    } catch(error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
})

export default usersRouter;