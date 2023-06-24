// import PrivateComponent from './utils/PrivateComponent';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TestAxios from './pages/TestAxios';
import React, {  } from "react";
import { Link, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
// import cv from './mah.png';
import Nav from './pages/Nav';
import PrivateRoute from './utils/PrivateRoute';
import NotLoggedIn from './utils/NotLoggedIn';
import Register from './pages/Register';
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
          <Route element={< Register />} path="/register" exact />







          <Route element={<NotLoggedIn>< LoginPage /></NotLoggedIn>} path="/login" />
        </Routes>

      </BrowserRouter >



    </>
  );
};

export default App;
