const Task = require("../models/taskModel.js");
const Notification = require("../models/notificationModel.js");
const Activity = require("../models/activityModel.js");

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
    });
    await task.save();

    await Notification.create({
      recipient: assignee,
      message: `You have been assigned a new task: ${title}`,
    });
    await Activity.create({
      user: req.user.id,
      action: `Created task "${title}"`,
      project,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { project, status, priority, assignee } = req.query;
    let filter = {};
    if (project) filter.project = project;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignee) filter.assignee = assignee;

    const tasks = await Task.find(filter)
      .populate("assignee")
      .sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("assignee", "name email");
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignee",
      "name email"
    );
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, getTaskById };
