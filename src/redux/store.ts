import { configureStore } from '@reduxjs/toolkit';

const storeApp = configureStore({
  reducer: {
    // store
  }
});

export type RootState = ReturnType<typeof storeApp.getState>;
export type AppDispatch = typeof storeApp.dispatch;

export default storeApp;
