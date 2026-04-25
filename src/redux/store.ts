// Redux store configuration with localStorage persistence
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import tasksReducer from "./slices/tasksSlice";
import themeReducer from "./slices/themeSlice";

const STORAGE_KEY = "personality-dev-state-v1";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  tasks: tasksReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Load persisted state from localStorage
const loadState = (): Partial<RootState> | undefined => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as Partial<RootState>;
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

// Persist state on every change
store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
  } catch {
    // ignore quota errors
  }
});

export type AppDispatch = typeof store.dispatch;
