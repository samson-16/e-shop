import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [] as Product[],
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.find((p) => p.id === action.payload.id);
      if (exists) {
        return state.filter((p) => p.id !== action.payload.id);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
