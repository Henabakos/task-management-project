const express = require("express");
const {
  getUserNotifications,
} = require("../controllers/notificationController.Js");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @route   GET /api/notifications
 * @desc    Fetch user notifications
 * @access  Private (Authenticated Users)
 */
router.get("/", authMiddleware, getUserNotifications);

export default router;
