import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api/api";

interface Team {
  _id: string;
  name: string;
  description?: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

interface TeamState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  teams: [],
  loading: false,
  error: null,
};

export const createTeam = createAsyncThunk(
  "teams/create",
  async (
    teamData: { name: string; description?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/teams", teamData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create team");
    }
  }
);

export const fetchTeams = createAsyncThunk(
  "teams/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/teams");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch teams");
    }
  }
);

export const fetchTeamById = createAsyncThunk(
  "teams/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/teams/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch team");
    }
  }
);

export const updateTeam = createAsyncThunk(
  "teams/update",
  async (
    {
      id,
      teamData,
    }: { id: string; teamData: { name: string; description?: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/teams/${id}`, teamData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update team");
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "teams/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/teams/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete team");
    }
  }
);

export const addUserToTeam = createAsyncThunk(
  "teams/addUser",
  async (
    { teamId, userId }: { teamId: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/teams/addUser", { teamId, userId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to add user to team"
      );
    }
  }
);

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        state.loading = false;
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTeamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTeamById.fulfilled,
        (state, action: PayloadAction<Team>) => {
          state.loading = false;
          const index = state.teams.findIndex(
            (team) => team._id === action.payload._id
          );
          if (index !== -1) {
            state.teams[index] = action.payload;
          } else {
            state.teams.push(action.payload);
          }
        }
      )
      .addCase(fetchTeamById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        state.loading = false;
        const index = state.teams.findIndex(
          (team) => team._id === action.payload._id
        );
        if (index !== -1) {
          state.teams[index] = action.payload;
        }
      })
      .addCase(updateTeam.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.teams = state.teams.filter((team) => team._id !== action.payload);
      })
      .addCase(deleteTeam.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUserToTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addUserToTeam.fulfilled,
        (state, action: PayloadAction<Team>) => {
          state.loading = false;
          const index = state.teams.findIndex(
            (team) => team._id === action.payload._id
          );
          if (index !== -1) {
            state.teams[index] = action.payload;
          }
        }
      )
      .addCase(addUserToTeam.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
