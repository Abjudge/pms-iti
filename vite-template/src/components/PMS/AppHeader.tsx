import { useState } from 'react';
import { useListState, useDisclosure } from '@mantine/hooks';
import {
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Avatar,
  Menu,
  Group,
  Center,
  rem,
  createStyles,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { IconChevronDown, IconUserCircle, IconLogout2 } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/TokensSlice';

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [openedModal, { open, close }] = useDisclosure(false);
  const [values, handlers] = useListState([{ a: 1 }]);
  const [workspacesList, setWorkspacesList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const workspaces = useWorkspacesStore((state) => state.workspaces);

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
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Group>
          <MantineLogo size={34} />
        </Group>
        <Group>
          <Menu
            shadow="md"
            width={200}
            trigger="hover"
            transitionProps={{ exitDuration: 0 }}
            withinPortal
          >
            <Menu.Target>
              <a className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>Workspaces</span>
                  <IconChevronDown size={rem(12)} stroke={1.5} />
                </Center>
              </a>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Your workspaces</Menu.Label>
              {/* {workspaces.length ? workspaces : <Text fz="xs"> No workspaces yet.</Text>} */}
            </Menu.Dropdown>
          </Menu>

          <Menu
            shadow="md"
            width={200}
            trigger="hover"
            transitionProps={{ exitDuration: 0 }}
            withinPortal
          >
            <Menu.Target>
              <a className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>Projects</span>
                  <IconChevronDown size={rem(12)} stroke={1.5} />
                </Center>
              </a>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Your workspaces</Menu.Label>
              {/* {workspaces.length ? workspaces : <Text fz="xs"> No workspaces yet.</Text>} */}
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Group className={classes.avatar}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Avatar
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                alt="it's me"
                ml="auto"
                radius="xl"
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconUserCircle size={14} />}>Profile</Menu.Item>
              <Menu.Item onClick={handleLogout} icon={<IconLogout2 size={14} />}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    </Header>
  );
}
