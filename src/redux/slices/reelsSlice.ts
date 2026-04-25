import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Reel {
  id: string;
  videoUrl: string;
  title: string;
  description: string;
}

interface ReelsState {
  items: Reel[];
  activeIndex: number;
}

const initialState: ReelsState = {
  items: [],
  activeIndex: 0,
};

const reelsSlice = createSlice({
  name: "reels",
  initialState,
  reducers: {
    setReels: (state, action: PayloadAction<Reel[]>) => {
      state.items = action.payload;
      if (state.activeIndex >= action.payload.length) state.activeIndex = 0;
    },
    setActiveReel: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
  },
});

export const { setReels, setActiveReel } = reelsSlice.actions;
export default reelsSlice.reducer;

