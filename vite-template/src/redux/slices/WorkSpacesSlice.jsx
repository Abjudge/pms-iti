import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MyAxios from '../../utils/AxiosInstance';
const initialState = {
  workspaces: [],
  fetched: false,
};

export const GetWorkSpaces = createAsyncThunk('GetWorkSpaces', async (access) => {
  const { data } = await MyAxios.get('workspaces/', {
    headers: { Authorization: `JWT ${access}`, 'Content-Type': 'application/json' },
  });
  console.log(
    '🚀 ~ file: WorkSpacesSlice.jsx:15 ~ GetWorkSpaces ~{tokens.access}:',
    `JWT ${access}`
  );
  console.log('🚀 ~ file: WorkSpacesSlice.jsx:15 ~ GetWorkSpaces ~ data:', data);
  return data;
});

const WorkSpacesSlice = createSlice({
  name: 'WorkSpacesSlice',
  initialState,
  reducers: {
    AddWorkSpace: (state, action) => {
      state.workspaces.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(GetWorkSpaces.pending, (state, action) => {
      state.fetched = false;
    });
    builder.addCase(GetWorkSpaces.fulfilled, (state, action) => {
      state.fetched = true;
      state.workspaces = action.payload;
      console.log('data fetched', action.payload);
    });
    builder.addCase(GetWorkSpaces.rejected, (state, action) => {
      alert('rejected');
    });
  },
});

export const { AddWorkSpace } = WorkSpacesSlice.actions;

export default WorkSpacesSlice.reducer;
