// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import paymentReducer from "./paymentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // Add your user reducer here
    payment: paymentReducer, // Add your user reducer here
  },
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
