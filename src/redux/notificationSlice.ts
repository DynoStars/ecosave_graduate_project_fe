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
  },
});

export const { increment, reset, setCount } = notificationSlice.actions;
export default notificationSlice.reducer;
