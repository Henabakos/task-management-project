const Task = require("../models/taskModel");
const Project = require("../models/projectModel");
const User = require("../models/userModel");

// Create a new task
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      project,
      status,
      priority,
      assignee,
      dueDate,
      labels,
      attachments,
      subtasks,
    } = req.body;
    const task = new Task({
      title,
      description,
      project,
      status,
      priority,
      assignee,
      dueDate,
      labels,
      attachments,
      subtasks,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks for a project
const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ project: projectId })
      .populate("assignee", "name email")
      .populate("project", "name");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id)
      .populate("assignee", "name email")
      .populate("project", "name")
      .populate("history.user", "name email");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const task = await Task.findByIdAndUpdate(id, updates, { new: true })
      .populate("assignee", "name email")
      .populate("project", "name");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign a task to a user
const assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.assignee = userId;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.status = status;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a comment to a task
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.history.push({ user: userId, action: comment });
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a subtask to a task
const addSubtask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.subtasks.push({ title });
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a subtask status
const updateSubtaskStatus = async (req, res) => {
  try {
    const { id, subtaskId } = req.params;
    const { status } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }
    subtask.status = status;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
  assignTask,
  updateTaskStatus,
  addComment,
  addSubtask,
  updateSubtaskStatus,
};
