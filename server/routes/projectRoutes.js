const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
  logActivity,
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
router.get("/", authMiddleware, getAllProjects);

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

/**
 * @route   POST /api/projects/:id/members
 * @desc    Add a member to a project
 * @access  Private (Only Project Admins)
 */
router.post("/:id/members", authMiddleware, checkRole(["ADMIN"]), addMember);

/**
 * @route   DELETE /api/projects/:id/members
 * @desc    Remove a member from a project
 * @access  Private (Only Project Admins)
 */
router.delete(
  "/:id/members",
  authMiddleware,
  checkRole(["ADMIN"]),
  removeMember
);

/**
 * @route   POST /api/projects/:id/activity
 * @desc    Log activity for a project
 * @access  Private (Authenticated Users)
 */
router.post("/:id/activity", authMiddleware, logActivity);

module.exports = router;
