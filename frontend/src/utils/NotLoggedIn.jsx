import { Navigate } from "react-router";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cv from '../mah.png';

const NotLoggedIn = ({ children }) => {

    const loggedin = useSelector((state) => state.TokensSlice.loggedin);
    const full = useSelector((state) => state.TokensSlice.full);



    if (!full) {
        return (
            <>
                <h2>checking your credentials </h2>
                <p>if this page persisted then your logged out   click to go to login page      <Link to='/login'>login</Link><br />
                </p>
                <img src={cv} />
                {!loggedin ? children : <Navigate to="/" />}
            </>
        );

    } else {
        return (!loggedin ? children : <Navigate to="/" />);
    }

};
// sdfdsfsd

export default NotLoggedIn;