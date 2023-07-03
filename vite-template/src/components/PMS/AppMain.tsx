import { useState } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { useListState, useDisclosure } from '@mantine/hooks';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Avatar,
  Menu,
  Group,
  Center,
  Button,
  Title,
  Modal,
  TextInput,
  FileInput,
  Box,
  Table,
  Badge,
  NavLink,
  ScrollArea,
  rem,
  createStyles,
  UnstyledButton,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import {
  IconPlus,
  IconChevronDown,
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconUserCircle,
  IconLogout2,
} from '@tabler/icons-react';
import WorkspaceListMain from './workspace/WorkspaceListMain';
import WorkspaceViewMain from './workspace/WorkspaceViewMain';
import WorkspaceEdit from './workspace/WorkspaceEdit';
import ProjectViewMain from './project/ProjectViewMain';

export default function AppMain() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [openedModal, { open, close }] = useDisclosure(false);
  const [values, handlers] = useListState([{ a: 1 }]);
  const [workspacesList, setWorkspacesList] = useState([]);

  const useStyles = createStyles((theme) => ({
    header: {
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      borderBottom: 0,
    },

    avatar: {
      padding: 6,
      cursor: 'pointer',
      '&:hover': {
        borderRadius: theme.radius.xl,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
      },
    },

    inner: {
      height: rem(56),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    links: {
      [theme.fn.smallerThan('sm')]: {
        // override default link color
        display: 'none',
      },
    },

    burger: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },

    link: {
      display: 'block',
      lineHeight: 1,
      padding: `${rem(8)} ${rem(12)}`,
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color: theme.black,
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.1
        ),
      },
    },

    linkLabel: {
      marginRight: rem(5),
      color: 'black',
    },

    plusButton: {
      padding: '5px',
      borderRadius: '5px',
      '&:hover': {
        backgroundColor: theme.colors.gray[1],
      },

      '&:active': {
        backgroundColor: theme.colors.gray[3],
      },
    },
  }));

  const { classes } = useStyles();
  alert('AppMain');

  const { pathname } = useLocation();
  if (pathname === '/workspaces') {
    return <WorkspaceListMain />;
  }
  switch (pathname) {
    case '/workspaces/workspace/:workspaceId':
      return <WorkspaceViewMain />;
    case '/workspaces/workspace/edit':
      return <WorkspaceEdit />;
    case '/workspaces/workspace/project':
      return <ProjectViewMain />;
  }

  
}
