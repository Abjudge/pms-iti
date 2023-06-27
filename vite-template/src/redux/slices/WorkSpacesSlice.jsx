import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  workspaces: [],
};

const WorkSpacesSlice = createSlice({
  name: 'WorkSpacesSlice',
  initialState,
  reducers: {
    AddWorkSpace: (state, action) => {
      state.workspaces.push(action.payload);
    },
    SetWorkSpace: (state, action) => {
      state.workspaces = action.payload;
    },
  },
});

export const { AddWorkSpace, SetWorkSpace } = WorkSpacesSlice.actions;

export default WorkSpacesSlice.reducer;
