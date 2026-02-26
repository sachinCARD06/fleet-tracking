import { createAsyncThunk } from "@reduxjs/toolkit";
import * as actionTypes from "../actionsTypes";
import apiClient from "../../api/apiClient";
import type { Allocation } from "../../types/models";

export const getAllocations = createAsyncThunk<
  Allocation[],
  void,
  { rejectValue: Error }
>(actionTypes.GET_ALLOCATIONS, async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/allocations");
    return response.data;
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});
