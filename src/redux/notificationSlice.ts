import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  count: number;
}

const initialState: NotificationState = {
  count: 0,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    addNotifications: (state, action: PayloadAction<number>) => {
      state.count += action.payload; // Cộng số lượng thông báo mới vào count
    },
  },
});

export const { increment, reset, setCount, addNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
