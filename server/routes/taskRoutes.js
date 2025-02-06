const express = require("express");
const { createTask, getTasks } = require("../controllers/taskController");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private (Members & Admins)
 */
router.post("/", authMiddleware, createTask);

/**
 * @route   GET /api/tasks
 * @desc    Fetch all tasks with filters
 * @access  Private (Authenticated Users)
 */
router.get("/", authMiddleware, getTasks);

export default router;
