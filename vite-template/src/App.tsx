import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './ThemeProvider';
import { Welcome } from './Welcome/Welcome';
import Login from './components/Login';
import Nav from './components/Nav';
import Register from './components/Register';
import { Container, AppShell } from '@mantine/core';
import PageNotFound from './components/PageNotFound';
import MainAppShell from './components/PMS/MainAppShell';

export default function App() {
  return (
    // <ThemeProvider>

    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Nav />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/workspaces" element={<MainAppShell />} />
        <Route path="/workspaces/workspace/:workspaceID" element={<MainAppShell />} />
        <Route path="*" element={<Navigate to="/workspaces" replace />} />
      </Routes>
    </MantineProvider>

    // </ThemeProvider>
  );
}
