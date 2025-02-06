const express = require("express");
const {
  createProject,
  getAllProjects,
} = require("../controllers/projectController");
const { authMiddleware, checkRole } = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private (Admin & Members)
 */
router.post("/", authMiddleware, checkRole(["admin", "member"]), createProject);

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Private (Authenticated Users)
 */
router.get("/", authMiddleware, getAllProjects);

export default router;
