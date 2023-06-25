import { configureStore } from '@reduxjs/toolkit';
import WorkSpacesSlice from './slices/WorkSpacesSlice';
import TokensSlice from './slices/TokensSlice';
import AddWorkSpaceSlice from './slices/AddWorkSpace'
export const store = configureStore({
  reducer: {
    WorkSpacesSlice,
    TokensSlice,
    AddWorkSpaceSlice,
  },
});
