import React from 'react';
import { useSelector } from 'react-redux';
import { Loader, Center } from '@mantine/core';

import Login from '../components/Login';

const PrivateRoute = ({ children }) => {
  const loggedout = useSelector((state) => state.TokensSlice.loggedout);
  const full = useSelector((state) => state.TokensSlice.full);

  if (!loggedout) {
    return (
      <Center  h={700} mx="auto">
        {full ? (
          children
        ) : (
          
          <Loader />
          
        )}
      </Center>
    );
  } else {
    return <Login />;
  }
};

export default PrivateRoute;
