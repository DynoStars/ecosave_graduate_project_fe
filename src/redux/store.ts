// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import paymentReducer from "./paymentSlice";
import notificationReducer from "./notificationSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // Add your user reducer here
    payment: paymentReducer, // Add your user reducer here
    notifications: notificationReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
