const Comment = require("../models/commentModel.js");

const addComment = async (req, res) => {
  try {
    const { taskId, user, content } = req.body;
    const comment = new Comment({ task: taskId, user, content });
    await comment.save();
    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a comment by task query

const getCommentByTask = async (req, res) => {
  try {
    const { taskId } = req.query;
    const comments = await Comment.find({ task: taskId })
      .populate("user", "name email")
      .populate("task", "title description");

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addComment, getCommentByTask, deleteComment };
