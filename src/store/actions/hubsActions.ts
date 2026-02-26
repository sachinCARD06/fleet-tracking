import { createAsyncThunk } from "@reduxjs/toolkit";
import * as actionTypes from "../actionsTypes";
import apiClient from "../../api/apiClient";
import type { Hub } from "../../types/models";

export const getHubs = createAsyncThunk<Hub[], void, { rejectValue: Error }>(
  actionTypes.GET_HUBS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/hubs");
      return response.data;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  },
);
