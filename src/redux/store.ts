import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productSlice";
import favoritesReducer from "./features/favoritesSlice";
import themeReducer from "./features/themeSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
