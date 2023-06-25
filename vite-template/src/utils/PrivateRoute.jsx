import React from 'react';
import { useSelector } from 'react-redux';

import Login from '../components/Login';

const PrivateRoute = ({ children }) => {
  const loggedout = useSelector((state) => state.TokensSlice.loggedout);
  const full = useSelector((state) => state.TokensSlice.full);

  if (!loggedout) {
    return (
      <>
        {full ? (
          children
        ) : (
          <h2>
            <pre>
              Refreshing your credentials if this page persist check your internet connection and
              reload the page
            </pre>
          </h2>
        )}
      </>
    );
  } else {
    return <Login />;
  }
};

export default PrivateRoute;
