import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Integration {
  id: string;
  name: string;
  status: "connected" | "disconnected";
}

interface IntegrationState {
  integrations: Integration[];
}

const initialState: IntegrationState = {
  integrations: [],
};

const integrationSlice = createSlice({
  name: "integration",
  initialState,
  reducers: {
    setIntegrations: (state, action: PayloadAction<Integration[]>) => {
      state.integrations = action.payload;
    },
    updateIntegrationStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: "connected" | "disconnected";
      }>
    ) => {
      const integration = state.integrations.find(
        (i) => i.id === action.payload.id
      );
      if (integration) {
        integration.status = action.payload.status;
      }
    },
  },
});

export const { setIntegrations, updateIntegrationStatus } =
  integrationSlice.actions;
export default integrationSlice.reducer;
