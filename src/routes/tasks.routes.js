const { Router } = require('express');
const { getAlltasks, gettasks, createtask, deletetask, updatetask, gettask } = require('../controllers/task.controller')


const router = Router();


router.get('/libreta', getAlltasks);

router.get('/tasks/:id', gettask);

router.post('/tasks', createtask);

router.delete('/tasks/:id', deletetask);

router.put('/tasks/:id', updatetask);

module.exports = router;