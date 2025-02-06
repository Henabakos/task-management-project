import Task from "../models/task.model.ts";
import Notification from "../models/notification.model.ts";
import Activity from "../models/activity.model.ts";

export const createTask = async (req, res) => {
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

export const getTasks = async (req, res) => {
  try {
    const { project, status, priority, assignee } = req.query;
    let filter: { [key: string]: any } = {};
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
