import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";




const initialState = {
  tokens: {},
  user: {},
  full: false,
  // updateTokensfun: {},
  running_interval: {},
  loggedin: false,
  constant: ""
};

// export const getTokens = createAsyncThunk("getTokens", async () => {
//   const { data } = await axios.post("http://127.0.0.1:8000/auth/jwt/create/", {
//     "email": "moustafashahin122@gmail.com",
//     "password": "lovelove122@A"

//   }
//   );
//   console.log(data);
//   // console.log("🚀 ~ file: TokensSlice.jsx:23 ~ getTokens ~ data:", data);
//   return data;
// });






export const refreshTokens = createAsyncThunk("refreshTokens", async (refresh) => {

  const { data } = await axios.post("http://127.0.0.1:8000/auth/jwt/refresh/", {
    "refresh": refresh,
  }
  );
  console.log("🚀 ~ file: TokensSlice.jsx:33 ~ refreshTokens ~ data.access:", data.access);
  return data;

}
);
const TokensSlice = createSlice({
  name: "Tokens",
  initialState,
  reducers: {


    setTokens: (state, action) => {

      const { access, refresh } = action.payload;
      // console.log("🚀 ~ file: TokensSlice.jsx:34 ~ access:", access);
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
        console.log("///////////////////////////////////////////////////////////////////////////////");
        console.log("🚀 ~ file: TokensSlice.jsx:89 ~ state.running_interval:", state.running_interval);

      } else {
        alert("there is another interval running");
      }



    },
    setLoggedIn: (state, action) => {

      state.loggedin = true;


    },
    setupdateTokensfun: (state, action) => {

      state.updateTokensfun = action.payload;


    },
    // refreshTokens: (state) => {
    //   state.auth ;


    // },
    logout: (state, action) => {
      if (state.loggedin) {
        console.log("🚀 ~ file: TokensSlice.jsx:62 ~ state.running_interval:", state.running_interval);

        alert("interval cleared");

        clearInterval(state.running_interval);
      }
      console.log("🚀 ~ file: TokensSlice.jsx:67 ~ state.running_interval:", state.running_interval);

      localStorage.clear();
      alert("logou");
      state.tokens = {};
      state.full = false;
      state.user = {};
      state.loggedin = false;

    },

  },

  extraReducers: (builder) => {
    // builder.addCase(getTokens.fulfilled, (state, action) => {
    //   state.tokens = action.payload;
    //   // state.tokens.access = access;
    //   // state.tokens.refresh = refresh;
    //   // console.log("dssssssssssssssssssssssssssssss", state.tokens.access);
    //   state.full = true;
    // });


    builder.addCase(refreshTokens.pending, (state, action) => {
      state.full = false;



    });
    builder.addCase(refreshTokens.fulfilled, (state, action) => {
      state.tokens.access = action.payload.access;
      console.log("🚀 ~ file: TokensSlice.jsx:88 ~ builder.addCase ~ action.payload.access:", action.payload.access);
      console.log("*******************************************************************");
      state.auth = true;
      const { user_id } = jwt_decode(state.tokens.access);
      console.log("🚀 ~ file: TokensSlice.jsx:142 ~ builder.addCase ~ state.tokens.access:", state.tokens.access);
      state.user.user_id = user_id;
      // console.log("🚀 ~ file: TokensSlice.jsx:89 ~ builder.addCase ~ user_id:", user_id);
      state.loggedin = true; 
      state.full = true;


    });
    builder.addCase(refreshTokens.rejected, (state, action) => {
      TokensSlice.caseReducers.logout(state, action); alert("failed to refresh");
    });
  },
});
export const { setTokens, updateFull, setUser, logout, setupdateTokensfun, setRunningInterval, setLoggedIn } = TokensSlice.actions;

export default TokensSlice.reducer;
