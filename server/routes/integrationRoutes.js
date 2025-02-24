const express = require("express");
const { connectSlack } = require("../controllers/integrationController");
const { authMiddleware, checkRole } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @route   POST /api/integrations/slack
 * @desc    Connect Slack for project notifications
 * @access  Private (Admins Only)
 */
router.post("/slack", authMiddleware, checkRole(["admin"]), connectSlack);

module.exports = router;
