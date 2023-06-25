import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const initialState = {
  loggedout: false,
  tokens: {},
  user: {},
  full: false,
  running_interval: {},
  loggedin: false,
  intervaltime: 2000000,
  baseURL: 'http://127.0.0.1:8000',
};

export const refreshTokens = createAsyncThunk('refreshTokens', async (refresh) => {
  const { data } = await axios.post(
    'http://127.0.0.1:8000/auth/jwt/refresh/',
    {
      refresh: refresh,
    },
    { headers: { 'Content-Type': 'application/json' } }
  );
  console.log('🚀 ~ file: TokensSlice.jsx:33 ~ refreshTokens ~ data.access:', data.access);
  return data;
});
const TokensSlice = createSlice({
  name: 'Tokens',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      const { access, refresh } = action.payload; // {acess:"dsfs", }
      state.tokens.access = access;
      state.tokens.refresh = refresh;
    },

    setUser: (state, action) => {
      const { user_id } = action.payload;
      state.user.user_id = user_id;
    },
    updateFull: (state, action) => {
      state.full = action.payload;
    },
    setRunningInterval: (state, action) => {
      if (!state.loggedin) {
        state.running_interval = action.payload;
        console.log(
          '///////////////////////////////////////////////////////////////////////////////'
        );
        console.log(
          '🚀 ~ file: TokensSlice.jsx:89 ~ state.running_interval:',
          state.running_interval
        );
      } else {
        alert('there is another interval running');
      }
    },
    setLoggedIn: (state, action) => {
      state.loggedin = true;
    },
    setloggedout: (state, action) => {
      state.loggedout = false;
    },
    setupdateTokensfun: (state, action) => {
      state.updateTokensfun = action.payload;
    },
    logout: (state, action) => {
      if (state.loggedin) {
        console.log(
          '🚀 ~ file: TokensSlice.jsx:62 ~ state.running_interval:',
          state.running_interval
        );

        // alert("interval cleared");

        clearInterval(state.running_interval);
      }
      console.log(
        '🚀 ~ file: TokensSlice.jsx:67 ~ state.running_interval:',
        state.running_interval
      );

      localStorage.clear();
      alert('logou');
      state.tokens = {};
      state.full = false;
      state.user = {};
      state.loggedin = false;
      state.loggedout = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshTokens.pending, (state, action) => {
      state.full = false;
    });
    builder.addCase(refreshTokens.fulfilled, (state, action) => {
      state.tokens.access = action.payload.access;
      console.log(
        '🚀 ~ file: TokensSlice.jsx:88 ~ builder.addCase ~ action.payload.access:',
        action.payload.access
      );
      console.log('*******************************************************************');
      state.auth = true;
      const { user_id } = jwt_decode(state.tokens.access);
      console.log(
        '🚀 ~ file: TokensSlice.jsx:142 ~ builder.addCase ~ state.tokens.access:',
        state.tokens.access
      );
      state.user.user_id = user_id;
      state.loggedin = true;
      state.full = true;
    });
    builder.addCase(refreshTokens.rejected, (state, action) => {
      // TokensSlice.caseReducers.logout(state, action);
      if (action.error.code == 'ERR_NETWORK') {
        alert('network error');
      } else if (action.error.code == 'token_not_valid') {
        alert('tokens expired');
        TokensSlice.caseReducers.logout(state, action);
      } else {
        alert('base case');

        TokensSlice.caseReducers.logout(state, action);
      }
      console.log('🚀 ~ file: TokensSlice.jsx:115 ~ builder.addCase ~ action:', action);
      console.log('🚀 ~ file: TokensSlice.jsx:115 ~ builder.addCase ~ action:', action.error);
      alert('failed to refresh');
    });
  },
});
export const {
  setTokens,
  updateFull,
  setloggedout,
  setUser,
  logout,
  setupdateTokensfun,
  setRunningInterval,
  setLoggedIn,
} = TokensSlice.actions;

export default TokensSlice.reducer;
