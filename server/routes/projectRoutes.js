const express = require("express");
const {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
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

/**
 * @route PUT /api/projects/:id
 * @desc Update project details
 * @access Private (Only Project Admins)
 */
router.put("/:id", authMiddleware, checkRole(["Admin"]), updateProject);

/**
 * @route DELETE /api/projects/:id
 * @desc Delete a project
 * @access Private (Only Project Admins)
 */
router.delete("/:id", authMiddleware, checkRole(["Admin"]), deleteProject);

export default router;
