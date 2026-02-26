import { createSlice } from "@reduxjs/toolkit";
import { getAllocations } from "../actions";
import type { Allocation } from "@/types/models";

interface AllocationsState {
  allocations: Allocation[];
  loading: boolean;
  error: string | null;
}

const initialState: AllocationsState = {
  allocations: [],
  loading: false,
  error: null,
};

const allocationsSlice = createSlice({
  name: "allocations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllocations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllocations.fulfilled, (state, action) => {
      state.allocations = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllocations.rejected, (state, action) => {
      state.error = action.payload?.message || "Failed to fetch allocations";
      state.loading = false;
    });
  },
});

export default allocationsSlice.reducer;
