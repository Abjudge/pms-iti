import { AppShell, Button, Center, Navbar, Stack, Title } from "@mantine/core";
import { useLocation, useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppNavbar from "./AppNavbar";
import AppMain from "./AppMain";

interface CenteredTitleProps {
  title: string;
}
function CenteredTitle({ title }: CenteredTitleProps) {
  return (
    <Center h="100%" w="100%">
      <Title order={2}>{title}</Title>
    </Center>
  );
}

function EmptyMainPage() {
  return (
    <CenteredTitle title="Choose a workspace or add a new one from the + button to start" />
  );
}

function WorkspacePage() {
  const { pathname } = useLocation();
  const id = pathname?.split("/")?.at(-1);

  return <CenteredTitle title={`You are viewing workspace ${id}`} />;
}

function DynamicApp() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/workspace")) {
    return <WorkspacePage />;
  }

  switch (pathname) {
    case "/main":
      return <EmptyMainPage />;
    case "foo":
      return null;
    default:
      return null;
  }
}

function MainNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Stack>
        <Button onClick={() => navigate("/main")}>Back to Main</Button>
        <Button onClick={() => navigate("/workspace/1")}>Workspace 1</Button>
        <Button onClick={() => navigate("/workspace/2")}>Workspace 2</Button>
        <Button onClick={() => navigate("/workspace/3")}>Workspace 3</Button>
      </Stack>
    </Navbar>
  );
}



export default function MainAppShell() {

  return (
    <AppShell

      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"

      header={<AppHeader />}
      navbar={<AppNavbar />}>
      <AppMain />
    </AppShell>
  );
}
