const User = require("../models/userModel");
const Project = require("../models/projectModel");
const Notification = require("../models/notificationModel"); // Assuming you have a Notification model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      profileImage,
      bio,
      oauthProvider,
      oauthId,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage,
      bio,
      oauthProvider,
      oauthId,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const inviteMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;
    const adminId = req.user.id;
    const admin = await User.findById(adminId);

    if (admin.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Only admins can invite members" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const notification = new Notification({
      user: userId,
      message: `You have been invited to join the project: ${project.name}`,
      type: "INVITATION",
      project: projectId,
      sender: adminId,
    });

    await notification.save();
    res
      .status(200)
      .json({ message: "Invitation sent successfully", notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const acceptInvitation = async (req, res) => {
  try {
    const { notificationId } = req.body;
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const project = await Project.findById(notification.project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.members.push({ user: notification.user, role: "EDITOR" });
    await project.save();

    notification.status = "ACCEPTED";
    await notification.save();

    res.status(200).json({ message: "Invitation accepted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  inviteMember,
  loginUser,
  acceptInvitation,
};
