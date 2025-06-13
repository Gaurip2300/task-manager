const express = require('express');
const router = express.Router();
const TaskController = require('../../controllers/taskController/TaskController');
const auth = require('../../middleware/auth')

/**
 * @openapi
 * /api/tasks/get-tasks/:
 *   get:
 *     summary: fetch-task-list
 *     description: Fetch Tasks List!
 *     tags: ['Tasks']
 *     security: []
 *     responses:
 *       200:
 *         description: Returns a Task List.
 */
router.get('/get-tasks', auth, TaskController.getAllTasks);

/**
 * @openapi
 * /api/tasks/create-task:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task for the authenticated user.
 *     tags: ['Tasks']
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task.
 *               description:
 *                 type: string
 *                 description: Detailed description of the task.
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Due date for the task (ISO 8601 format).
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Priority level of the task.
 *     responses:
 *       201:
 *         description: Task successfully created.
 *       400:
 *         description: Invalid input or missing fields.
 *       401:
 *         description: Unauthorized. Missing or invalid JWT.
 */

router.post('/create-task', auth, TaskController.createTask);




/**
 * @openapi
 * /api/tasks/update-task/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update an existing task by its ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the task.
 *               description:
 *                 type: string
 *                 description: Updated description of the task.
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Updated due date in ISO 8601 format.
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Priority of the task.
 *               status:
 *                 type: string
 *                 enum: [Pending, In Progress, Completed]
 *                 description: Task completion status.
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized. Missing or invalid token.
 *       404:
 *         description: Task not found.
 */

router.put('/update-task/:id', auth, TaskController.updateTask);

/**
 * @openapi
 * /api/tasks/delete-task/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task by its ID. Only authenticated users can perform this action.
 *     tags: ['Tasks']
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete.
 *     responses:
 *       200:
 *         description: Task successfully deleted.
 *       401:
 *         description: Unauthorized. Missing or invalid JWT.
 *       404:
 *         description: Task not found.
 */

router.delete('/delete-task/:id', auth, TaskController.deleteTask);
module.exports = router;
