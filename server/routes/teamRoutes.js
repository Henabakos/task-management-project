const express = require("express");
const {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addUserToTeam,
} = require("../controllers/teamController");
const { authMiddleware, checkRole } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @route   POST /api/teams
 * @desc    Create a new team
 * @access  Private (Admin & Members)
 */
router.post("/teams", authMiddleware, checkRole(["ADMIN"]), createTeam);

/**
 * @route   GET /api/teams
 * @desc    Get all Teams
 * @access  Private (Authenticated Users)
 */

router.get("/teams", authMiddleware, getTeams);

/**
 * @route   GET /api/team/:id
 * @desc    Get a single team by ID
 * @access  Private (Authenticated Users)
 */

router.get("/teams/:id", authMiddleware, getTeamById);

/**
 * @route   PUT /api/team/:id
 * @desc    Update team details
 * @access  Private (Only team Admins)
 */

router.put("/teams/:id", authMiddleware, checkRole(["ADMIN"]), updateTeam);

/**
 * @route   DELETE /api/teams/:id
 * @desc    Delete a team
 * @access  Private (Only Team Admins)
 */
router.delete("/teams/:id", authMiddleware, checkRole(["ADMIN"]), deleteTeam);

/**
 * @route   POST /api/teams/addUser
 * @desc   Add A member To The Project
 * @access  Private (Only Team Admins)
 */

router.post(
  "/teams/addUser",
  authMiddleware,
  checkRole(["ADMIN"]),
  addUserToTeam
);

module.exports = router;
