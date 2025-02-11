import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import projectReducer from "../features/projectSlice";
import taskReducer from "../features/taskSlice";
import commentReducer from "../features/commentSlice";
import notificationReducer from "../features/notificationSlice";
import integrationReducer from "../features/integrationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    task: taskReducer,
    comment: commentReducer,
    notification: notificationReducer,
    integration: integrationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
