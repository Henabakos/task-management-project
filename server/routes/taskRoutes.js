const express = require("express");
const {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
  assignTask,
  updateTaskStatus,
  addComment,
  addSubtask,
  updateSubtaskStatus,
} = require("../controllers/taskController");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private (Authenticated Users)
 */
router.post("/", authMiddleware, createTask);

/**
 * @route   GET /api/tasks/project/:projectId
 * @desc    Get all tasks for a project
 * @access  Private (Authenticated Users)
 */
router.get("/project/:projectId", authMiddleware, getTasksByProject);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get a single task by ID
 * @access  Private (Authenticated Users)
 */
router.get("/:id", authMiddleware, getTaskById);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Private (Authenticated Users)
 */
router.put("/:id", authMiddleware, updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private (Authenticated Users)
 */
router.delete("/:id", authMiddleware, deleteTask);

/**
 * @route   PUT /api/tasks/:id/assign
 * @desc    Assign a task to a user
 * @access  Private (Authenticated Users)
 */
router.put("/:id/assign", authMiddleware, assignTask);

/**
 * @route   PUT /api/tasks/:id/status
 * @desc    Update task status
 * @access  Private (Authenticated Users)
 */
router.put("/:id/status", authMiddleware, updateTaskStatus);

/**
 * @route   POST /api/tasks/:id/comment
 * @desc    Add a comment to a task
 * @access  Private (Authenticated Users)
 */
router.post("/:id/comment", authMiddleware, addComment);

/**
 * @route   POST /api/tasks/:id/subtask
 * @desc    Add a subtask to a task
 * @access  Private (Authenticated Users)
 */
router.post("/:id/subtask", authMiddleware, addSubtask);

/**
 * @route   PUT /api/tasks/:id/subtask/:subtaskId/status
 * @desc    Update a subtask status
 * @access  Private (Authenticated Users)
 */
router.put(
  "/:id/subtask/:subtaskId/status",
  authMiddleware,
  updateSubtaskStatus
);

module.exports = router;
