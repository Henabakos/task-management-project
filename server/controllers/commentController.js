const Comment = require("../models/commentModel.js");

export const addComment = async (req, res) => {
  try {
    const { taskId, user, content } = req.body;
    const comment = new Comment({ task: taskId, user, content });
    await comment.save();
    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
