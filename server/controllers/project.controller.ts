import Project from "../models/project.model.ts";
import Activity from "../models/activity.model.ts";

export const createProject = async (req, res) => {
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

    await Activity.create({
      user: owner,
      action: `Created project ${name}`,
      project: project._id,
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("members.user")
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
