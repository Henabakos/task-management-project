import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../api/api";

interface Member {
  user: string;
  role: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  owner: string;
  members: Member[];
  visibility: string;
  deadline: string;
  activityLog: string[];
}

interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
  loading: false,
  error: null,
};

export const fetchAllProjects = createAsyncThunk(
  "project/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/projects");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "project/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createProject = createAsyncThunk(
  "project/create",
  async (projectData: Partial<Project>, thunkAPI) => {
    try {
      const response = await api.post("/projects", projectData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/update",
  async (
    { id, updates }: { id: string; updates: Partial<Project> },
    thunkAPI
  ) => {
    try {
      const response = await api.put(`/projects/${id}`, updates);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/delete",
  async (id: string, thunkAPI) => {
    try {
      await api.delete(`/projects/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addMemberToProject = createAsyncThunk(
  "project/addMember",
  async ({ id, member }: { id: string; member: Member }, thunkAPI) => {
    try {
      const response = await api.post(`/projects/${id}/add-member`, member);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeMemberFromProject = createAsyncThunk(
  "project/removeMember",
  async ({ id, userId }: { id: string; userId: string }, thunkAPI) => {
    try {
      const response = await api.post(`/projects/${id}/remove-member`, {
        userId,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearSelectedProject: (state) => {
      state.selectedProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.loading = false;
          state.projects = action.payload;
        }
      )
      .addCase(
        fetchAllProjects.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.error;
        }
      )
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProjectById.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.loading = false;
          state.selectedProject = action.payload;
        }
      )
      .addCase(
        fetchProjectById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.error;
        }
      )
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.loading = false;
          state.projects.push(action.payload);
        }
      )
      .addCase(createProject.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.loading = false;
          const index = state.projects.findIndex(
            (project) => project.id === action.payload.id
          );
          if (index !== -1) {
            state.projects[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteProject.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.projects = state.projects.filter(
            (project) => project.id !== action.payload
          );
        }
      );
  },
});

export const { clearSelectedProject } = projectSlice.actions;
export default projectSlice.reducer;
