import { createAsyncThunk } from "@reduxjs/toolkit";
import * as actionTypes from "../actionsTypes";
import apiClient from "../../api/apiClient";
import type { Product } from "../../types/models";

export const getProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: Error }
>(actionTypes.GET_PRODUCTS, async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/products");
    return response.data;
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});
