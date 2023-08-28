const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const { fetchAllTasks, createTask, deleteTask, updateTask } = require('../controllers/task');
const router = express.Router();


router.get('/fetchAllTask',fetchuser,fetchAllTasks);
router.post('/createTask',fetchuser,createTask)
router.delete('/deleteTask/:id',fetchuser,deleteTask)
router.put('/updateTask/:id',fetchuser,updateTask)

module.exports = router;
