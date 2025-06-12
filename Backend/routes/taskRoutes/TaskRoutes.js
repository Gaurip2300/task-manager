const express = require('express');
const router = express.Router();
const TaskController = require('../../controllers/taskController/TaskController');
const auth = require('../../middleware/auth')

router.post('/create-task', auth, TaskController.createTask);
router.get('/get-tasks', auth, TaskController.getAllTasks);
router.put('/update-task/:id', auth, TaskController.updateTask);
router.delete('/delete-task/:id', auth, TaskController.deleteTask);
router.get('/search-tasks', auth, TaskController.searchTasks);

module.exports = router;
