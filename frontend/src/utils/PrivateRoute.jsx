import { Navigate } from "react-router";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cv from '../mah.png';
import LoginPage from "../pages/LoginPage";

const PrivateRoute = ({ children }) => {

    // const tokens = useSelector((state) => state.TokensSlice.tokens);
    // const full = useSelector((state) => state.TokensSlice.full);
    const loggedout = useSelector((state) => state.TokensSlice.loggedout);





            return (!loggedout ? children : <LoginPage />);

};

export default PrivateRoute;