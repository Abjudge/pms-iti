import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from './ThemeProvider';
import { Welcome } from './Welcome/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import { Container, AppShell } from '@mantine/core';
import PageNotFound from './components/PageNotFound';
import MainAppShell from "./components/PMS/MainAppShell";
import ActivateAccount from "./components/ActivateAccount";
import VerificationEmailSent from "./components/VerificationEmailSent";
import TestAxios from './components/TestAxios';
import PrivateRoute from './utils/PrivateRoute';
import NotLoggedIn from './utils/NotLoggedIn';

export default function App() {
  return (
    // <ThemeProvider>

    <MantineProvider withGlobalStyles withNormalizeCSS>
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
        <Route path="/workspaces" element={<MainAppShell />} />
        <Route path="/workspaces/workspace" element={<MainAppShell />} />
        <Route path="/workspaces/workspace/edit" element={<MainAppShell />} />
        <Route path="/workspaces/workspace/project" element={<MainAppShell />} />
        <Route path="*" element={<Navigate to="/workspaces" replace />} />
      </Routes>
    </MantineProvider>

    // </ThemeProvider>

  );
}
