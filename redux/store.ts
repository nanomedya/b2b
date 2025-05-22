// src/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice"; // Örnek bir slice

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});

// RootState ve AppDispatch tanımları
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
