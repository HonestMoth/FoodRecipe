import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { favoriterecipes: [] },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload.idFood;
      const exists = state.favoriterecipes.some((r) => r.idFood === id);
      if (exists) {
        state.favoriterecipes = state.favoriterecipes.filter((r) => r.idFood !== id);
      } else {
        state.favoriterecipes.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;