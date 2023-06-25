import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import MyAxios from '../../utils/AxiosInstance';
const initialState = {
  workspace: {},
  fetched: false,
};

export const AddWorkSpace = createAsyncThunk('AddWorkSpace', async (access) => {
  const { data } = await MyAxios.post('workspaces/Add', {
    headers: { Authorization: `JWT ${access}`, 'Content-Type': 'application/json' },
  });
  console.log('🚀 ~ file: WorkSpacesSlice.jsx:15 ~ AddWorkSpace ~ data:', data);
  return data;
});

const AddWorkSpaceSlice = createSlice({
  name: 'AddWorkSpaceSlice',
  initialState,
  reducers: {
    AddWorkSpace: (state, action) => {
      state.workspace = { [action.payload.key]: action.payload.value };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AddWorkSpace.pending, (state, action) => {
      state.fetched = false;
    });
    builder.addCase(AddWorkSpace.fulfilled, (state, action) => {
      state.fetched = true;
      state.workspace = { [action.payload.key]: action.payload.value };
      //   console.log('data fetched', action.payload);
    });
    builder.addCase(AddWorkSpace.rejected, (state, action) => {
      alert('rejected');
    });
  },
});

export const { addToCart } = AddWorkSpaceSlice.actions;

export default AddWorkSpaceSlice.reducer;
