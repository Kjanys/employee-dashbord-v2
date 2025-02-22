import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

// Проверяем localStorage при инициализации состояния
const initialState: UserState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("user"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Логин пользователя
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Сохраняем пользователя в localStorage
    },
    // Логаут пользователя
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // Удаляем пользователя из localStorage
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
