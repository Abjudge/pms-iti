import { AppShell, Button, Center, Navbar, Stack, Title } from "@mantine/core";
import { useLocation, useNavigate, BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppNavbar from "./AppNavbar";
import PrivateRoute from '../../utils/PrivateRoute';

export default function MainAppShell() {

  return (
    <AppShell

      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"

      header={<AppHeader />}
      navbar={<AppNavbar />}>

      <Outlet />

 
    </AppShell>
  );
}
