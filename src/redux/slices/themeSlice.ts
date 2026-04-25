// Theme slice — light/dark mode toggle
import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark";
}

const initialState: ThemeState = {
  mode: (typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches)
    ? "dark"
    : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
