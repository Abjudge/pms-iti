import { MantineProvider } from '@mantine/core';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import Login from './components/Login';
import Nav from './components/Nav';
import Register from './components/Register';
import MainAppShell from './components/PMS/MainAppShell';
// import TestAxios from './components/TestAxios';
import PrivateRoute from './utils/PrivateRoute';
import NotLoggedIn from './utils/NotLoggedIn';

export default function App() {
  return (
    // <ThemeProvider>

    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Nav />

      <Routes>
        <Route
          path="/login"
          element={
            <NotLoggedIn>
              <Login />
            </NotLoggedIn>
          }
        />
        <Route
          path="/test"
          element={
            <PrivateRoute>
              <TestAxios />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/workspaces"
          element={
            <PrivateRoute>
              <MainAppShell />
            </PrivateRoute>
          }
        />
        <Route path="/workspaces/workspace/:workspaceID" element={<MainAppShell />} />
        <Route path="*" element={<Navigate to="/workspaces" replace />} />
      </Routes>
    </MantineProvider>

    // </ThemeProvider>
  );
}
