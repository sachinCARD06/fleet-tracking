import { createAsyncThunk } from "@reduxjs/toolkit";
import * as actionTypes from "../actionsTypes";
import apiClient from "../../api/apiClient";
import type { Vehicle } from "../../types/models";

export const getVehicles = createAsyncThunk<
  Vehicle[],
  void,
  { rejectValue: Error }
>(actionTypes.GET_VEHICLES, async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/vehicles");
    return response.data;
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});
