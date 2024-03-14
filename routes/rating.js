const express = require('express');
const router = express.Router();
const ratingList = require('../mocks/rating');

// Получить оценку задания
router.get('/:task_id', (req, res) => {
    try {
        const { task_id }= req.params || {};
        if (!task_id) {
            res.status(400).json({ error: 'Task id is required' });
            return;
        }
        const allRating = ratingList.filter(rate => Number(rate.task_id) === Number(task_id));
        if (allRating.length === 0) {
            res.status(404).json({ error: 'Rating not found' });
            return;
        }
        const rating = Math.round(allRating.reduce((acc, rate) => acc + rate.rating, 0) / allRating.length);
        res.json({ rating });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Оценить задачу
router.post('/', (req, res) => {
    try {
        const { rating, user_id, task_id }= req.body || {};
        if (!rating || !user_id || !task_id) {
            res.status(400).json({ error: 'Task id is required' });
            return;
        }

        const newRating = {
            id: ratingList.length + 1,
            user_id,
            task_id,
            rating,
        };
        res.json({ rating: [...ratingList, newRating] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

module.exports = router;