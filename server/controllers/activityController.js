const Activity = require("../models/activityModel.js");

export const logActivity = async (user, action, project) => {
  try {
    const activity = new Activity({ user, action, project });
    await activity.save();
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};
