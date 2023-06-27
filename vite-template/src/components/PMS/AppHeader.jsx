import { useEffect, useState } from 'react';
import { useListState, useDisclosure } from '@mantine/hooks';
import {
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Menu,
  Group,
  Center,
  Title,
  rem,
  createStyles,
  Text,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { IconChevronDown, IconUserCircle, IconLogout2 } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/TokensSlice';
import { useSelector } from 'react-redux';
import MyAxios from '../../utils/AxiosInstance';
import { SetWorkSpace } from '../../redux/slices/WorkSpacesSlice';

export default function AppShellDemo() {
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

    userName: {
      color: 'white',
      backgroundColor: '#339af0',
      padding: 7,
      borderRadius: '50%',
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
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
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

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [openedModal, { open, close }] = useDisclosure(false);
  const [values, handlers] = useListState([{ a: 1 }]);
  const tokens = useSelector((state) => state.TokensSlice.tokens);
  const workspaces = useSelector((state) => state.WorkSpacesSlice.workspaces);

  // const workspaces = useWorkspacesStore((state) => state.workspaces);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const fetchData = async () => {
    // workspaces
    try {
      const response = await MyAxios.get('workspaces/', {
        headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
      });

      if (response.status == 200) {
        dispatch(SetWorkSpace(response.data));
        alert('succeess');
      } else {
        alert('failed');
      }
    } catch (error) {
      alert('fetch error ');
    }
  };
  useEffect(() => {
    fetchData();
    // trying();
  }, []);
  function goToWorkspace(id) {
    console.log(id);
    navigate(`/workspaces/workspace/${id}`);
  }
  // get user's first and last name from api
  const first_name = 'Mahmoud';
  const last_name = 'Tarek';
  const userName = first_name.charAt(0).toUpperCase() + last_name.charAt(0).toUpperCase();
  alert('app header mounted');
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

              {workspaces ? (
                workspaces.map((workspace) => (
                  <>
                    <Menu.Item onClick={() => goToWorkspace(workspace.id)}>
                      {workspace.name}
                    </Menu.Item>
                    {/* <img src={baseURL + workspace.image} height="400px" alt="dfsgfdsgfd" /> */}
                  </>
                ))
              ) : (
                <Text color="gray" fz="sm">
                  No workspaces yet, hit the plus button to create one.
                </Text>
              )}
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
              <Menu.Label>Your projects</Menu.Label>

              <Text color="gray" fz="sm">
                No workspaces yet, hit the plus button to create one.
              </Text>

              {/* {workspaces.length ? workspaces : <Text fz="xs"> No workspaces yet.</Text>} */}
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Group className={classes.avatar}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Title order={5} className={classes.userName}>
                {userName}
              </Title>
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