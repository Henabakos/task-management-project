const express = require("express");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { authMiddleware, checkRole } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private (Admin & Members)
 */
router.post("/", authMiddleware, checkRole(["ADMIN"]), createProject);

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Private (Authenticated Users)
 */
router.get("/", authMiddleware, getProjects);

/**
 * @route   GET /api/projects/:id
 * @desc    Get a single project by ID
 * @access  Private (Authenticated Users)
 */
router.get("/:id", authMiddleware, getProjectById);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update project details
 * @access  Private (Only Project Admins)
 */
router.put("/:id", authMiddleware, checkRole(["ADMIN"]), updateProject);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Private (Only Project Admins)
 */
router.delete("/:id", authMiddleware, checkRole(["ADMIN"]), deleteProject);

module.exports = router;
