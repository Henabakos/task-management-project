const express = require("express");
const {
  createNotification,
  getNotificationsByUser,
  markAsRead,
  markAsUnread,
  deleteNotification,
} = require("../controllers/notificationControllers");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @route   POST /api/notifications
 * @desc    Create a new notification
 * @access  Private (Authenticated Users)
 */
router.post("/", authMiddleware, createNotification);

/**
 * @route   GET /api/notifications/user/:userId
 * @desc    Get all notifications for a user
 * @access  Private (Authenticated Users)
 */
router.get("/user/:userId", authMiddleware, getNotificationsByUser);

/**
 * @route   PUT /api/notifications/:id/read
 * @desc    Mark a notification as read
 * @access  Private (Authenticated Users)
 */
router.put("/:id/read", authMiddleware, markAsRead);

/**
 * @route   PUT /api/notifications/:id/unread
 * @desc    Mark a notification as unread
 * @access  Private (Authenticated Users)
 */
router.put("/:id/unread", authMiddleware, markAsUnread);

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Delete a notification
 * @access  Private (Authenticated Users)
 */
router.delete("/:id", authMiddleware, deleteNotification);

module.exports = router;
