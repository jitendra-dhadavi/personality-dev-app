// Categories slice — holds the personality development categories
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import mockData from "@/data/mockData.json";

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface CategoriesState {
  items: Category[];
}

const initialState: CategoriesState = {
  items: mockData.categories as Category[],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
