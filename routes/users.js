const express = require('express');
const router = express.Router();

const usersList = require('../mocks/users');

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

router.get('/', (_, res) => {
    const list = usersList.map(user => ({ id: user.id, name: user.name, rating: user.rating, role: user.role, permissions: user.permissions }));
    try {
        res.json({ users: [...list] });
    } catch (error) {
        res.status(500).json({ error: error.message });
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

router.get('/:id', (req, res) => {
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
        res.status(500).json({ error: error.message });
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

router.delete('/:id', (req, res) => {
    try {
        const { id }= req.params || {};
        if (!id) {
            res.status(400).json({ error: 'User id is required' });
            return;
        }
        const newUsersList = usersList.filter(user => Number(user.id) !== Number(id));
        res.json({ status: 'ok', user_id: id, users: newUsersList});
    } catch (error) {
        res.status(500).json({ error: error.message });
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

router.patch('/:id', (req, res) => {
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
       
        })


module.exports = router;