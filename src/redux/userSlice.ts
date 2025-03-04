import { UserProfile } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  user: UserProfile | null;
  isLoggedIn: boolean;
}
const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    updateUser: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.user) Object.assign(state.user, action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});
export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
