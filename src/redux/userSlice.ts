import { UserProfile } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu state cho user
interface UserState {
  user: UserProfile | null; // Dữ liệu người dùng
  isLoggedIn: boolean; // Trạng thái đăng nhập
}

const initialState: UserState = {
  user: null, // Ban đầu chưa có thông tin người dùng
  isLoggedIn: false, // Ban đầu là chưa đăng nhập
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action để lưu thông tin người dùng vào Redux Store
    setUser(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    // Action để cập nhật thông tin người dùng
    updateUser(state, action: PayloadAction<Partial<UserProfile>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Action để xóa thông tin người dùng (khi logout)
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

// Export actions
export const { setUser, updateUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
