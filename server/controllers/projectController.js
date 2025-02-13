const Project = require("../models/projectModel");
const User = require("../models/userModel");
const Team = require("../models/teamModel");
const Activity = require("../models/activityModel");
const createProject = async (req, res) => {
  try {
    const { name, description, owner, team, visibility, deadline } = req.body;

    // Check if the owner exists
    const ownerExists = await User.findById(owner);
    if (!ownerExists) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Check if the team exists
    if (team) {
      const teamExists = await Team.findById(team);
      if (!teamExists) {
        return res.status(404).json({ message: "Team not found" });
      }
    }

    const project = new Project({
      name,
      description,
      owner,
      team,
      visibility,
      deadline,
    });

    await project.save();

    // Log activity
    const activity = new Activity({
      action: "Created project",
      user: owner,
      project: project._id,
    });
    await activity.save();

    project.activityLog.push(activity._id);
    await project.save();

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("owner team activityLog");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate(
      "owner team activityLog"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, team, visibility, deadline } = req.body;

    // Check if the team exists
    if (team) {
      const teamExists = await Team.findById(team);
      if (!teamExists) {
        return res.status(404).json({ message: "Team not found" });
      }
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { name, description, team, visibility, deadline },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Log activity
    const activity = new Activity({
      action: "Updated project",
      user: req.user._id, // Assuming you have user information in req.user
      project: project._id,
    });
    await activity.save();

    project.activityLog.push(activity._id);
    await project.save();

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Log activity
    const activity = new Activity({
      action: "Deleted project",
      user: req.user._id, // Assuming you have user information in req.user
      project: project._id,
    });
    await activity.save();

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
