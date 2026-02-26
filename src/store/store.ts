import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import ordersReducer from "./reducers/ordersReducers";
import allocationsReducer from "./reducers/allocationsReducers";
import driversReducer from "./reducers/driversReducers";
import hubsReducer from "./reducers/hubsReducers";
import productsReducer from "./reducers/productsReducers";
import vehiclesReducer from "./reducers/vehiclesReducers";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    allocations: allocationsReducer,
    drivers: driversReducer,
    hubs: hubsReducer,
    products: productsReducer,
    vehicles: vehiclesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
