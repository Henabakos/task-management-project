import Activity from "../models/activity.model.ts";

export const logActivity = async (user, action, project) => {
  try {
    const activity = new Activity({ user, action, project });
    await activity.save();
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};
