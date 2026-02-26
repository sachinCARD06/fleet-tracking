import { createSlice } from "@reduxjs/toolkit";
import { getVehicles } from "../actions";
import type { Vehicle } from "@/types/models";

interface VehiclesState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
}

const initialState: VehiclesState = {
  vehicles: [],
  loading: false,
  error: null,
};

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVehicles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVehicles.fulfilled, (state, action) => {
      state.vehicles = action.payload;
      state.loading = false;
    });
    builder.addCase(getVehicles.rejected, (state, action) => {
      state.error = action.payload?.message || "Failed to fetch vehicles";
      state.loading = false;
    });
  },
});

export default vehiclesSlice.reducer;
