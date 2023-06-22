import { Navigate } from "react-router";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cv from '../mah.png';

const NotLoggedIn = ({ children }) => {

    const loggedout = useSelector((state) => state.TokensSlice.loggedout);



    return (loggedout ? children : <Navigate to="/" />);


};
// sdfdsfsd

export default NotLoggedIn;