import { User } from "@/app/types/system/i-user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}
const MOCK_USER = {
  id: "1",
  name: "Иван",
  surname: "Иванов",
  login: "admin",
};

const initialState: UserState = {
  user: MOCK_USER,
  isAuthenticated: !!localStorage?.getItem("user"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Логин пользователя
    login(state, action: PayloadAction<User>) {
      state.user = MOCK_USER;
      state.isAuthenticated = true;
      console.log("action.payload", action.payload);
      //localStorage?.setItem("user", JSON.stringify(action.payload));
    },
    // Логаут пользователя
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage?.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
