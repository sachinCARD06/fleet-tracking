import { createAsyncThunk } from "@reduxjs/toolkit";
import * as actionTypes from "../actionsTypes";
import apiClient from "../../api/apiClient";
import type { Order } from "../../types/models";

export const getOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: Error }
>(actionTypes.GET_ORDERS, async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/orders");
    return response.data;
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});
