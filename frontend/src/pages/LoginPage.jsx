import React from 'react';
import { refreshTokens, setLoggedIn, setRunningInterval, setTokens, setUser, logout, updateFull, setloggedout } from '../redux/slices/TokensSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const LoginPage = () => {
  alert("login page rendered");
  const loggedin = useSelector((state) => state.TokensSlice.loggedin);

  const dispatch = useDispatch();
  const fourMinutes = 10000;

  const navigate = useNavigate();

  // const { data } = await axios.post("http://127.0.0.1:8000/auth/jwt/refresh/", {
  //   "refresh": refresh,

  // }
  // );

  const loginUser = async (e) => {
    e.preventDefault();

    if (!loggedin) {
      try {

        const response = await axios.post("http://127.0.0.1:8000/auth/jwt/create/", {
          "email": e.target.email.value,
          "password": e.target.password.value

        }

        );
        // ddd

        const { access, refresh } = response.data;
        if (response.status === 200) {
          dispatch(updateFull(true));
          dispatch(setUser(jwt_decode(access)));
          dispatch(setTokens({ access, refresh }));

          localStorage.setItem('Tokens', await JSON.stringify(response.data));
          navigate('/');


          const interval = setInterval(() => {
            dispatch(refreshTokens(refresh));
          }
            , fourMinutes);

          console.log("🚀 ~ file: LoginPage.jsx:52 ~ interval ~ interval:", interval);

          dispatch(setRunningInterval(interval));
          dispatch(setLoggedIn());
          dispatch(setloggedout());


          console.log("🚀 ~ file: LoginPage.jsx:55 ~ loginUser ~ refresh:", refresh);

        } else {
          alert('Something went wrong!');
          dispatch(logout());

        }

      } catch (error) {
        // alert('Something faild to make request !' + error.response.status);
        dispatch(logout());
      }


    } else {
      alert("you 're logged in");
    }
  };










  // const updateToken = async () => {
  // // const { data } = await axios.post("http://127.0.0.1:8000/auth/jwt/refresh/", {
  // //   "refresh": refresh,

  //   let response = await axios.post("http://127.0.0.1:8000/auth/jwt/refresh/", {
  //   "refresh": refresh,
  //   });

  //   let data = await response.json();

  //   if (response.status === 200) {
  //     setAuthTokens(data);
  //     setUser(jwt_decode(data.access));
  //     localStorage.setItem('authTokens', JSON.stringify(data));
  //   } else {
  //     logoutUser();
  //   }

  //   if (loading) {
  //     setLoading(false);
  //   }
  // }












  return (
    <div><form onSubmit={loginUser} >
      <input type="text" name="email" id="" placeholder='enter your email' />

      <input type="password" name="password" id="" />
      <input type="submit" />

    </form></div>);
};

export default LoginPage;