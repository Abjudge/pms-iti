import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useListState, useDisclosure } from '@mantine/hooks';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
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
  Divider,
  Flex,
  Image,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import {
  IconPlus,
  IconPencil,
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
import MyAxios from '../../../utils/AxiosInstance';
import { useSelector } from 'react-redux';

export default function ProjectViewNav() {
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
  const tokens = useSelector((state) => state.TokensSlice.tokens);

  const { classes } = useStyles();

  function createWorkspace(e) {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    setWorkspacesList((prevList) => [...prevList, data]);
    close();
  }

  const navigate = useNavigate();

  function goToWorkspace(e) {
    console.log(e.target.textContent);
    navigate(`/workspace/${e.target.textContent}`);
  }

  // function navigateToEditProject() {
  //     navigate(`/workspaces/workspace/project/edit`);
  // }
  const [data, setdata] = useState({});

  const workspaces = workspacesList.map((workspace) => (
    <NavLink
      fz="lg"
      color="#868e96"
      key={workspace}
      label={workspace.workspaceName}
      onClick={goToWorkspace}
    />
  ));
  console.log(workspaces);
  const params = useParams();
  const project_id = params.projectId;
  console.log('🚀 ~ file: ProjectViewNav.tsx:165 ~ ProjectViewNav ~ project_id:', project_id);
  const fetchData = async () => {
    // workspaces
    try {
      const response = await MyAxios.get(`projects/${project_id}`, {
        headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
      });

      if (response.status == 207) {
        setdata(response.data);
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

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ md: 700, lg: 300 }}>
      <Group>
        <Flex
          sx={{ width: '100%' }}
          mih={50}
          gap="md"
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Text fz="xl" color="black">
            {data ? data.name : 'project title'}
          </Text>
          <UnstyledButton size="sm" className={classes.plusButton}>
            <IconPencil color="gray" />
          </UnstyledButton>
        </Flex>
      </Group>
      <Divider mt={10} />

      <Navbar.Section grow mx="-xs" px="xs" mt={20}>
        <Group position="apart" spacing="xs" mb="md">
          <Text fz="md" color="black">
            Start Date
          </Text>
          <Text fz="sm" color="black">
            {data ? data.start_date : 'start date'}
          </Text>
        </Group>
        <Group position="apart" spacing="xs" mb="md">
          <Text fz="md" color="black">
            End Date
          </Text>
          <Text fz="sm" color="black">
            {data ? data.end_date : 'end date'}
          </Text>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}
