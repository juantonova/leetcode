import  express from 'express';

import RatingController from '../controllers/RatingController';

const router = express.Router();


/**
 * @swagger
 * /rating/{task_id}:
 *   get:
 *     summary: Получить оценку задачи по ID задачи
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Оценка задачи
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rating:
 *                   type: object 
 *                   $ref: '#/components/schemas/Rating'
 *       404:
 *         description: Rating not found
 */

router.get('/:task_id', RatingController.getRatingByTaskId)

/**
 * @swagger
 * /rating:
 *   post:
 *     summary: Оценить задачу
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rating'
 *     responses:
 *       200:
 *         description: Оценка задачи
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rating:
 *                   type: object 
 *                   $ref: '#/components/schemas/Rating'
 *       400:
 *         description: Invalid request
 */
router.post('/', RatingController.addRating)

export default router;