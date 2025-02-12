import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "@/api/api";
import { Payload } from "recharts/types/component/DefaultLegendContent";

interface Subtask {
  _id?: string;
  title: string;
  status: "TODO" | "DONE";
}

interface Attachment {
  url: string;
  name: string;
}

interface HistoryItem {
  user: string;
  action: string;
  timestamp: string;
}

export interface NewTask {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  project: string;
  labels?: string[];
  dueDate?: string;
  attachments: [];
  subtasks?: { _id: string; title: string; status: "TODO" | "DONE" }[];
}

export interface Task extends NewTask {
  _id: string;
  assignee?: string;
  history: HistoryItem[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
}

interface TasksState {
  tasks: Task[];
  selectedTask: Task | null;
  loading: boolean;
  error: string | null;
}

export const fetchTasksByProject = createAsyncThunk<Task[], string>(
  "tasks/fetchByProject",
  async (
    projectId: string,
    { rejectWithValue }
  ): Promise<Task[] | ReturnType<typeof rejectWithValue>> => {
    try {
      const response = await api.get(`/tasks/project/${projectId}`);
      return response.data as Task[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch tasks"
      );
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async (
    taskData: Omit<NewTask, "id">,
    { rejectWithValue }
  ): Promise<Task | ReturnType<typeof rejectWithValue>> => {
    try {
      const response = await api.post("/tasks", taskData);
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to create task"
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async (
    { id, updates }: { id: string; updates: Partial<Task> },
    { rejectWithValue }
  ): Promise<Task | ReturnType<typeof rejectWithValue>> => {
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to update task"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to delete task"
      );
    }
  }
);

export const assignTask = createAsyncThunk(
  "tasks/assign",
  async (
    { id, userId }: { id: string; userId: string },
    { rejectWithValue }
  ): Promise<Task | ReturnType<typeof rejectWithValue>> => {
    try {
      const response = await api.put(`/tasks/${id}/assign`, { userId });
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to assign task"
      );
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async (
    { id, status }: { id: string; status: Task["status"] },
    { rejectWithValue }
  ): Promise<Task | ReturnType<typeof rejectWithValue>> => {
    try {
      const response = await api.put(`/tasks/${id}/status`, { status });
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to update task status"
      );
    }
  }
);

export const addComment = createAsyncThunk(
  "tasks/addComment",
  async (
    { id, userId, comment }: { id: string; userId: string; comment: string },
    { rejectWithValue }
  ): Promise<Task | ReturnType<typeof rejectWithValue>> => {
    try {
      const response = await api.post(`/tasks/${id}/comments`, {
        userId,
        comment,
      });
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to add comment"
      );
    }
  }
);

export const addSubtask = createAsyncThunk(
  "tasks/addSubtask",
  async (
    { id, title }: { id: string; title: string },
    { rejectWithValue }
  ): Promise<Task | ReturnType<typeof rejectWithValue>> => {
    try {
      const response = await api.post(`/tasks/${id}/subtasks`, { title });
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to add subtask"
      );
    }
  }
);

export const updateSubtaskStatus = createAsyncThunk(
  "tasks/updateSubtaskStatus",
  async (
    {
      id,
      subtaskId,
      status,
    }: { id: string; subtaskId: string; status: Subtask["status"] },
    { rejectWithValue }
  ): Promise<Task | ReturnType<typeof rejectWithValue>> => {
    try {
      const response = await api.put(`/tasks/${id}/subtasks/${subtaskId}`, {
        status,
      });
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to update subtask status"
      );
    }
  }
);

const initialState: TasksState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTasksByProject.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.loading = false;
          state.tasks = action.payload;
        }
      )
      .addCase(fetchTasksByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.pending, (state, action: PayloadAction<Task>) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.selectedTask?._id === action.payload._id) {
          state.selectedTask = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        if (state.selectedTask?._id === action.payload) {
          state.selectedTask = null;
        }
      })
      .addCase(assignTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.selectedTask?._id === action.payload._id) {
          state.selectedTask = action.payload;
        }
      })
      .addCase(
        updateTaskStatus.fulfilled,
        (state, action: PayloadAction<Task>) => {
          const index = state.tasks.findIndex(
            (task) => task._id === action.payload._id
          );
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
          if (state.selectedTask?._id === action.payload._id) {
            state.selectedTask = action.payload;
          }
        }
      )
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.selectedTask?._id === action.payload._id) {
          state.selectedTask = action.payload;
        }
      })
      .addCase(addSubtask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.selectedTask?._id === action.payload._id) {
          state.selectedTask = action.payload;
        }
      })
      .addCase(
        updateSubtaskStatus.fulfilled,
        (state, action: PayloadAction<Task>) => {
          const index = state.tasks.findIndex(
            (task) => task._id === action.payload._id
          );
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
          if (state.selectedTask?._id === action.payload._id) {
            state.selectedTask = action.payload;
          }
        }
      );
  },
});

export const { setSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
