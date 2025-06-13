const Task = require('../../models/taskModels/TaskModel');
const statusCodes = require('../../utils/statusCodes');

const createTask = async (req, res, next) => {
    try{
        const { title, description, dueDate, priority, taskStatus } = req.body;

         if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Title is required and must be a non-empty string.' });
        }
        if (priority && !['low', 'medium', 'high'].includes(priority)) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Priority must be low, medium, or high.' });
        }

        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            status: taskStatus || 'pending',
            user_id: req.user._id
        })

        await task.save();
        res.status(statusCodes.CREATED).json(task)
    }catch(err){
        next(err);
    }
}

const getAllTasks = async (req, res, next) => {
    try{
        const tasks = await Task.find({ user_id: req.user._id });
        res.status(statusCodes.OK).json(tasks);
    }catch(err){
        next(err);   
    }
}

const updateTask = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { title, description, dueDate, priority, status } = req.body;

        if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Title must be a non-empty string.' });
        }
        if (priority !== undefined && !['low', 'medium', 'high'].includes(priority)) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Priority must be low, medium, or high.' });
        }
        if (status !== undefined && !['pending', 'in-progress', 'completed'].includes(status)) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Invalid status value.' });
        }
        
        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (dueDate !== undefined) updateFields.dueDate = dueDate;
        if (priority !== undefined) updateFields.priority = priority;
        if (status !== undefined) updateFields.status = status;

        const task =  await Task.findOneAndUpdate(
            { _id: id, user_id: req.user._id },
            updateFields,
            { new: true }
        )

        if(!task){
            return res.status(statusCodes.NOT_FOUND).json({message: 'Task not found'})
        }

        res.status(statusCodes.OK).json(task);
    }catch(err){
        next(err);
    }
}

const deleteTask = async (req, res, next) => {
    try{
        const { id } = req.params;
        const task = await Task.findOneAndDelete({
            _id:id
        })

        if(!task){
            return res.status(statusCodes.NOT_FOUND).json({ message: 'Task not found' });
        }

        res.status(statusCodes.OK).json({ message: 'Task deleted successfully' });
    }catch(err){
        next(err);
    }
}


module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask
};