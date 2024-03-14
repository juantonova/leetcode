const express = require('express');
const router = express.Router();
const solutionsList = require('../mocks/solutions');

 // Получить все решения задания
router.get('/:task_id', (req, res) => {
    const { task_id }= req.params || {};
    if (!task_id) {
        res.status(400).json({ error: 'Task id is required' });
        return;
    }

    const allSolutions = solutionsList.filter(solution => Number(solution.task_id) === Number(task_id));
    if (allSolutions.length === 0) {
        res.status(404).json({ error: 'Solutions are not found' });
        return;
    }

    res.json({ solutions: allSolutions });
})

// Отправить решение задачи
router.post('/', (req, res) => {
    const { solution, user_id, task_id }= req.body || {};
    if (!solution || !user_id || !task_id) {
        res.status(400).json({ error: 'Full data is required' });
        return;
    }

    const newSolution = {
        id: solutionsList.length + 1,
        user_id,
        task_id,
        solution,
    };

    res.json({ solutions: [ ...solutionsList, newSolution] });
})


module.exports = router;