const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  inviteMember,
  acceptInvitation,
} = require("../controllers/authController");
const { authMiddleware, checkRole } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @route   POST /api/auth
 * @desc    Create a new user
 * @access  Public
 */
router.post("/", createUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login a user
 * @access  Public
 */
router.post("/login", loginUser);

/**
 * @route   GET /api/auth
 * @desc    Get all auth
 * @access  Private (Authenticated Users)
 */
router.get("/", authMiddleware, getAllUsers);

/**
 * @route   GET /api/auth/:id
 * @desc    Get a single user by ID
 * @access  Private (Authenticated Users)
 */
router.get("/:id", authMiddleware, getUserById);

/**
 * @route   PUT /api/auth/:id
 * @desc    Update a user
 * @access  Private (Authenticated Users)
 */
router.put("/:id", authMiddleware, updateUser);

/**
 * @route   DELETE /api/auth/:id
 * @desc    Delete a user
 * @access  Private (Authenticated Users)
 */
router.delete("/:id", authMiddleware, deleteUser);

/**
 * @route   POST /api/auth/invite
 * @desc    Invite a member to a project (Admin only)
 * @access  Private (Admin)
 */
router.post("/invite", authMiddleware, checkRole(["ADMIN"]), inviteMember);

/**
 * @route   POST /api/auth/accept-invitation
 * @desc    Accept an invitation
 * @access  Private (Authenticated Users)
 */
router.post("/accept-invitation", authMiddleware, acceptInvitation);

module.exports = router;
