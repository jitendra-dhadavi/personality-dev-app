// Reusable selectors — derived data like progress percentage
import type { RootState } from "./store";

export const selectTasksByCategory = (categoryId: string) => (state: RootState) =>
  state.tasks.items.filter((t) => t.categoryId === categoryId);

export const selectCategoryProgress = (categoryId: string) => (state: RootState) => {
  const tasks = state.tasks.items.filter((t) => t.categoryId === categoryId);
  if (tasks.length === 0) return 0;
  const done = tasks.filter((t) => t.completed).length;
  return Math.round((done / tasks.length) * 100);
};

export const selectOverallProgress = (state: RootState) => {
  const tasks = state.tasks.items;
  if (tasks.length === 0) return 0;
  const done = tasks.filter((t) => t.completed).length;
  return Math.round((done / tasks.length) * 100);
};
