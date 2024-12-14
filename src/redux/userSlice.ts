import { UserProfile } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface UserState {
  currentUser: UserProfile | null;
}
const initialState: UserState = {
  currentUser: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<UserProfile>) {
      state.currentUser = action.payload;
    },
    clearCurrentUser(state) {
      state.currentUser = null;
    },
  },
});
export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
