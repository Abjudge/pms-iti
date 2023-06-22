import { configureStore } from "@reduxjs/toolkit";
import Cart from "./slices/CartSlice";
import TokensSlice from "./slices/TokensSlice";
export const store = configureStore({
  reducer: {
    Cart,
    TokensSlice,
  },
});
