import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { setNotifications, addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
