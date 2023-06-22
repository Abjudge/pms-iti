import { Navigate } from "react-router";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cv from '../mah.png';

const PrivateRoute = ({ children }) => {

    const tokens = useSelector((state) => state.TokensSlice.tokens);
    const full = useSelector((state) => state.TokensSlice.full);



    if (full) {
        return (tokens.access ? children : <Navigate to="/login" />);

    } else {
        return (





            <>
                <img src={cv} />
                <h2>updating your credentials </h2>
                <p>if this page persisted   click to go to login page      <Link to='/login'>login</Link><br />
                </p>
            </>








        );
    }


};

export default PrivateRoute;