const Task = require('../models/taskModel');

// Create a new task (Admin only)
exports.createTask = async (req, res) => {
  const { title, description, status, priority, assignedTo, dueDate, completedDate, startTime } = req.body;

  try {
    const task = new Task({
      title, description, status, priority, assignedTo, dueDate, completedDate, startTime
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error });
  }
};

// Get all tasks (Admin only)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tasks', error });
  }
};

// Get task by ID (Admin or authorized user)
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching task', error });
  }
};

// Update task (Admin only)
exports.updateTask = async (req, res) => {
  const { title, description, status, priority, assignedTo, dueDate, completedDate, startTime } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, assignedTo, dueDate, completedDate, startTime },
      { new: true } // Returns the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error });
  }
};

// Delete task (Admin only)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task', error });
  }
};