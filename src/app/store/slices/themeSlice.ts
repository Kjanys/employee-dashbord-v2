import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    //const savedTheme = localStorage?.getItem("theme") as Theme;
    return "dark";
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
      localStorage?.setItem("theme", action.payload);
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage?.setItem("theme", state.theme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
