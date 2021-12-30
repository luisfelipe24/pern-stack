const { Router } = require('express');
const { getAlltasks, gettasks, createtask, deletetask, updatetask, gettask } = require('../controllers/task.controller')


const router = Router();


router.get('/contactos', getAlltasks);

router.get('/contacto/:id', gettask);

router.post('/contactos', createtask);

router.delete('/contacto/:id', deletetask);

router.put('/contacto/:id', updatetask);

module.exports = router;