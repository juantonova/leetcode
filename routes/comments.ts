import express from 'express';
const router = express.Router();

import CommentsController from "../controllers/сommentsController";

/**
 * @swagger
 * /comments/{task_id}:
 *   get:
 *     summary: Получить все комментарии к задаче
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *          description: Список комментариев
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  comments:
 *                   type: array
 *                  items:
 *                    $ref: '#/components/schemas/Comment' 
 *       404:
 *         description: Comments not found
 */
router.get('/:task_id', CommentsController.getComments)

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Добавить комментарий к задаче
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Комментарий добавлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object 
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid request
 */
router.post('/', CommentsController.addComment)

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Удалить комментарий к задаче
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Комментарий удален
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment_id:
 *                   type: string
 *       404:
 *         description: Comment not found
 */
router.delete('/:id', CommentsController.deleteComment)

export default router;