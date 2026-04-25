// Tasks slice — manages tasks per category, completion, and add/delete
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import mockData from "@/data/mockData.json";

export interface Task {
  id: string;
  categoryId: string;
  title: string;
  completed: boolean;
}

interface TasksState {
  items: Task[];
}

const initialState: TasksState = {
  items: mockData.tasks as Task[],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add a new task to a specific category
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.items.push(action.payload);
      },
      prepare: (categoryId: string, title: string) => ({
        payload: {
          id: `${categoryId}-${Date.now()}`,
          categoryId,
          title,
          completed: false,
        } as Task,
      }),
    },
    // Toggle completion state of a task
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    // Remove a task
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTask, toggleTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
