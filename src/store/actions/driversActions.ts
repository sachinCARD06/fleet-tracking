import { createAsyncThunk } from "@reduxjs/toolkit";
import * as actionTypes from "../actionsTypes";
import apiClient from "../../api/apiClient";
import type { Driver } from "../../types/models";

export const getDrivers = createAsyncThunk<
  Driver[],
  void,
  { rejectValue: Error }
>(actionTypes.GET_DRIVERS, async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/drivers");
    return response.data;
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});
