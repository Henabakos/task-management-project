const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private (Members & Admins)
 */
router.post("/", authMiddleware, createTask);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update task details
 * @access  Private (Only Task Owner)
 */

router.put("/:id", authMiddleware, updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private (Only Task Owner)
 */

router.delete("/:id", authMiddleware, deleteTask);

/**
 * @route   GET /api/tasks/:id
 * @desc    Fetch a task by ID
 * @access  Private (Authenticated Users)
 */
router.get("/:id", authMiddleware, getTaskById);

/**
 * @route   GET /api/tasks
 * @desc    Fetch all tasks with filters
 * @access  Private (Authenticated Users)
 */
router.get("/", authMiddleware, getTasks);

export default router;
