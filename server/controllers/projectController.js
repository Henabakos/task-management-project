const Project = require("../models/projectModel");
const User = require("../models/userModel");
const Activity = require("../models/activityModel");

// Create a new project
const createProject = async (req, res) => {
  try {
    const { name, description, owner, members, visibility, deadline } =
      req.body;
    const project = new Project({
      name,
      description,
      owner,
      members,
      visibility,
      deadline,
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("owner", "name email")
      .populate("members.user", "name email");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id)
      .populate("owner", "name email")
      .populate("members.user", "name email")
      .populate("activityLog");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const project = await Project.findByIdAndUpdate(id, updates, { new: true })
      .populate("owner", "name email")
      .populate("members.user", "name email");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a member to a project
const addMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.body;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.members.push({ user: userId, role });
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a member from a project
const removeMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.members = project.members.filter(
      (member) => member.user.toString() !== userId
    );
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Log activity
const logActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { activityId } = req.body;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.activityLog.push(activityId);
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
  logActivity,
};
