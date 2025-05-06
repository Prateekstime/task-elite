const express = require('express');
const router = express.Router();
const {verifyToken, isAdmin} =require("../middleware/authMiddleware")
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');

// Admin only
router.post('/tasks', verifyToken, isAdmin, createTask);
router.get('/tasks', verifyToken,  getAllTasks);
router.get('/tasks/:id', verifyToken, getTaskById);
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, isAdmin, deleteTask);

module.exports = router;
