import { IUserAnswer } from "@/app/types/system/i-user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: IUserAnswer | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUserAnswer>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
