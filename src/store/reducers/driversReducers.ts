import { createSlice } from "@reduxjs/toolkit";
import { getDrivers } from "../actions";
import type { Driver } from "@/types/models";

interface DriversState {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
}

const initialState: DriversState = {
  drivers: [],
  loading: false,
  error: null,
};

const driversSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDrivers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDrivers.fulfilled, (state, action) => {
      state.drivers = action.payload;
      state.loading = false;
    });
    builder.addCase(getDrivers.rejected, (state, action) => {
      state.error = action.payload?.message || "Failed to fetch drivers";
      state.loading = false;
    });
  },
});

export default driversSlice.reducer;
