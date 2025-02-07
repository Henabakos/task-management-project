const express = require("express");
const {
  addComment,
  getCommentByTask,
  deleteComment,
} = require("../controllers/commentController");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @route   POST /api/comments
 * @desc    comment on a task
 * @access  all users
 */
router.post("/", authMiddleware, addComment);

/**
 * @route   GET /api/comment for task query
 * @desc    Get all comments for a task
 * @access  authenticated users
 */
router.get("/", authMiddleware, getCommentByTask);

/**
 * @route   DELETE /api/comments/:commentId
 * @desc    Delete a comment
 * @access  authenticated users
 */

router.delete("/:commentId", authMiddleware, deleteComment);

module.exports = router;
