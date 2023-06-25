import { configureStore } from '@reduxjs/toolkit';
import WorkSpacesSlice from './slices/WorkSpacesSlice';
import TokensSlice from './slices/TokensSlice';
export const store = configureStore({
  reducer: {
    WorkSpacesSlice,
    TokensSlice,
  },
});
