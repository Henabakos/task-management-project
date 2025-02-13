const express = require("express");
const authRoutes = require("./authRoutes");
const projectRoutes = require("./projectRoutes");
const taskRoutes = require("./taskRoutes");
const notificationRoutes = require("./notificationRoutes");
const integrationRoutes = require("./integrationRoutes");
const commentRoutes = require("./commentRoutes");
const teamRoutes = require("./teamRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/teams", teamRoutes);
router.use("/tasks", taskRoutes);
router.use("/notifications", notificationRoutes);
router.use("/integrations", integrationRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
