import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './ThemeProvider';
import { Welcome } from './Welcome/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import { Container, AppShell } from '@mantine/core';
import PageNotFound from './components/PageNotFound';
import MainAppShell from './components/PMS/MainAppShell';
import AppHeader from './components/PMS/AppHeader';
import AppNavbar from './components/PMS/AppNavbar';
import AppMain from './components/PMS/AppMain';
import ActivateAccount from './components/ActivateAccount';
import VerificationEmailSent from './components/VerificationEmailSent';
import TestAxios from './components/TestAxios';
import PrivateRoute from './utils/PrivateRoute';
import NotLoggedIn from './utils/NotLoggedIn';
import Nav from './components/Nav';
export default function App() {
  return (
    // <ThemeProvider>

    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Nav />
      

      <Routes>
        <Route path="/user_activation/:uid/:token" element={<ActivateAccount />} />
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
        <Route path="/VerificationEmail" element={<VerificationEmailSent />} />
        <Route
          path="/workspaces"
          element={
            <PrivateRoute>
              <MainAppShell />
            </PrivateRoute>
          }
        >
            <Route
              path="/workspaces/workspace/:workspaceId"
              element={
                <PrivateRoute>
                  <AppNavbar />
                  <AppMain />
                </PrivateRoute>
              }
            />
            <Route
              path="/workspaces/workspace/edit"
              element={
                <PrivateRoute>
                  <AppNavbar />
                  <AppMain />
                </PrivateRoute>
              }
            />
            <Route
              path="/workspaces/workspace/:workspaceId/project/:projectId"
              element={
                <PrivateRoute>
                  <AppNavbar />
                  <AppMain />
                </PrivateRoute>
              }
            />
        </Route>
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Navigate to="/workspaces" replace />
            </PrivateRoute>
          }
        />
      </Routes>
    </MantineProvider>

    // </ThemeProvider>
  );
}
