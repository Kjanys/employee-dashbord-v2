import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "dark";
  }
  return "dark";
};

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    //TODO убрать лишнее
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload); // Сохраняем тему в localStorage
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme); // Сохраняем тему в localStorage
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
