// import PrivateComponent from './utils/PrivateComponent';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TestAxios from './pages/TestAxios';
import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import cv from './mah.png';
import jwt_decode from "jwt-decode";
import { logout, refreshTokens, setRunningInterval, setTokens } from "./redux/slices/TokensSlice";
import Nav from './pages/Nav';
import PrivateRoute from './utils/PrivateRoute';
import NotLoggedIn from './utils/NotLoggedIn';
// import { applyMiddleware } from "@reduxjs/toolkit";

const App = () => {
  // alert("mounted");





  // const loggedin = useSelector((state) => state.TokensSlice.loggedin);
  // alert("logged in "+loggedin)



  // console.log("**********************************",loggedin);
  return (
    <>





      <BrowserRouter>
        <Link to='/'>home</Link> <br />
        <Link to='/login'>login</Link><br />
        <Link to='/test'>test</Link>

        <Nav />
        <Routes>


          <Route element={<PrivateRoute>< HomePage /></PrivateRoute>} path="/" exact />
          <Route element={<PrivateRoute>< TestAxios /></PrivateRoute>} path="/test" exact />







          <Route element={<NotLoggedIn>< LoginPage /></NotLoggedIn>} path="/login" />
        </Routes>

      </BrowserRouter >



    </>
  );
};

export default App;
