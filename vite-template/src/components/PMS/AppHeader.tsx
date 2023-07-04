import { useEffect, useState, memo } from 'react';
import { useListState, useDisclosure } from '@mantine/hooks';
import useWorkspaces from './queries/GetWorkspaces';
import useProjects from './queries/GetProjects';
import Logo from '../../assets/logo.png';
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
  Stack,
  ScrollArea,
  Image,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { IconChevronDown, IconUserCircle, IconLogout2 } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/TokensSlice';
import { useSelector } from 'react-redux';
import MyAxios from '../../utils/AxiosInstance';
// import { SetWorkSpace } from '../../redux/slices/WorkSpacesSlice';

function AppHeader() {
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
  const [userName, setUsername] = useState('');
  const [openedModal, { open, close }] = useDisclosure(false);
  const [values, handlers] = useListState([{ a: 1 }]);
  const tokens = useSelector((state) => state.TokensSlice.tokens);
  const [userID, setUserID] = useState(0);
  // const workspaces = useSelector((state) => state.WorkSpacesSlice.workspaces);

  // const workspaces = useWorkspacesStore((state) => state.workspaces);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const fetchUserData = async () => {
    // workspaces
    try {
      const response = await MyAxios.get('auth/users/me/', {
        headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
      });

      if (response.status == 200) {
        setUserID(response.data.id);
        setUsername(
          response.data.first_name.charAt(0).toUpperCase() +
            response.data.last_name.charAt(0).toUpperCase()
        ); // dispatch(SetWorkSpace(response.data));
    
      } else {
        alert('failed222');
      }
    } catch (error) {
      alert('fetch error22 ');
    }
  };

  // const fetchWorkspacesData = async () => {
  //   // workspaces
  //   try {
  //     const response = await MyAxios.get('workspaces/', {
  //       headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
  //     });

  //     if (response.status == 200) {
  //       dispatch(SetWorkSpace(response.data));
     
  //     } else {
  //       alert('failed');
  //     }
  //   } catch (error) {
  //     alert('fetch error ');
  //   }
  // };
  
  useEffect(() => {
    // fetchWorkspacesData();
    fetchUserData();
    // trying();
  }, []);

  
  function goToWorkspace(id) {
    navigate(`/workspaces/workspace/${id}`);
  }

  // get workspaceId from url
  const workspaceID = window.location.pathname.split('/')[3];
  function goToProject(id) {
    navigate(`/workspaces/workspace/${workspaceID}/project/${id}`);
  }
  // get user's first and last name from api
  // const first_name = 'Mahmoud';
  // const last_name = 'Tarek';
  // const userName = first_name.charAt(0).toUpperCase() + last_name.charAt(0).toUpperCase();
  const { data: workspaces, error, isLoading } = useWorkspaces();
  const { data: projects, error2, isLoading2 } = useProjects();
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

        <Group>
          <Image src={Logo} width={150}/>
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

            <Menu.Dropdown >
              <Menu.Label>Your workspaces</Menu.Label>
              <Stack spacing="xs" mt="sm" mb="md" style={{overflow: 'scroll', maxHeight: '300px'}}>

              {workspaces ? (
                workspaces.map((workspace) => (
              
                    <Menu.Item key={workspace.id} onClick={() => {goToWorkspace(workspace.id)}}>
                      {workspace.name}
                    </Menu.Item>
                    // {/* <img src={baseURL + workspace.image} height="400px" alt="dfsgfdsgfd" /> */}
      
                ))
              ) : (
                <Text color="gray" fz="sm">
                  No workspaces yet, hit the plus button to create one.
                </Text>
              )}
              </Stack>
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

              <Stack spacing="xs" mt="sm" mb="md" style={{overflow: 'scroll', maxHeight: '300px'}}>

              {projects ? (
                projects.map((project) => (
              
                    <Menu.Item key={project.id} onClick={() => goToWorkspace(project.id)}>
                      {project.name}
                    </Menu.Item>
                    // {/* <img src={baseURL + workspace.image} height="400px" alt="dfsgfdsgfd" /> */}
      
                ))
              ) : (
                <Text color="gray" fz="sm">
                  No projects yet, hit the plus button to create one.
                </Text>
              )}

              </Stack>

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

export default memo(AppHeader);
