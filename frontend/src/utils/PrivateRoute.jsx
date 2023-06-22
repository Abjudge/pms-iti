import React from "react";
import { useSelector } from "react-redux";

import LoginPage from "../pages/LoginPage";

const PrivateRoute = ({ children }) => {
    const loggedout = useSelector((state) => state.TokensSlice.loggedout);
    return (!loggedout ? children : <LoginPage />);
};

export default PrivateRoute;