import { createSlice } from "@reduxjs/toolkit";
import { getHubs } from "../actions";
import type { Hub } from "@/types/models";

interface HubsState {
  hubs: Hub[];
  loading: boolean;
  error: string | null;
}

const initialState: HubsState = {
  hubs: [],
  loading: false,
  error: null,
};

const hubsSlice = createSlice({
  name: "hubs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHubs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHubs.fulfilled, (state, action) => {
      state.hubs = action.payload;
      state.loading = false;
    });
    builder.addCase(getHubs.rejected, (state, action) => {
      state.error = action.payload?.message || "Failed to fetch hubs";
      state.loading = false;
    });
  },
});

export default hubsSlice.reducer;
