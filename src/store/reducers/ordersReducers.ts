import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../actions";
import type { Order } from "@/types/models";

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.error = action.payload?.message || "Failed to fetch orders";
      state.loading = false;
    });
  },
});

export default ordersSlice.reducer;
