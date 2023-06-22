// import PrivateComponent from './utils/PrivateComponent';

import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import cv from './mah.png';
import jwt_decode from "jwt-decode";
import { logout, refreshTokens, setRunningInterval, setTokens } from "../redux/slices/TokensSlice";
// import { applyMiddleware } from "@reduxjs/toolkit";


const Nav = () => {







    // alert("mounted nav bar");


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fourMinutes = 2000;



    const [tokens_from_local_Storage, setlocals] = useState(() => (localStorage.getItem('Tokens') ? JSON.parse(localStorage.getItem('Tokens')) : null));




    // if (tokens_from_local_Storage && tokens_from_local_Storage.refresh) {


    // } else {
    //   // alert("local storage is empty");
    // }

    const autoLogin = () => {
        if (tokens_from_local_Storage && tokens_from_local_Storage.refresh) {
            // dispatch(logout());


            dispatch(refreshTokens(tokens_from_local_Storage.refresh));


            const interval = setInterval(() => {
                dispatch(refreshTokens(tokens_from_local_Storage.refresh));
            }
                , fourMinutes);
            console.log('IIIiIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');

            dispatch(setRunningInterval(interval));







        }
        else {
            dispatch(logout());
        }



    };

    useEffect(() => {

        autoLogin();


    }, []);




    // const loggedin = useSelector((state) => state.TokensSlice.loggedin);
    // alert("logged in "+loggedin)


    const handleLogout = () => {





        dispatch(logout());
        navigate("/login");

    };







    return (
        <>
            <button onClick={handleLogout}>logout</button>
            <p>nav bar</p>

        </>
    );
};

export default Nav;
