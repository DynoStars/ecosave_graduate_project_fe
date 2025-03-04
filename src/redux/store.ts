import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import paymentReducer from './paymentSlice';
import notificationReducer from './notificationSlice';
import cartReducer from './cartSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    payment: paymentReducer,
    notifications: notificationReducer,
    cart: cartReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
