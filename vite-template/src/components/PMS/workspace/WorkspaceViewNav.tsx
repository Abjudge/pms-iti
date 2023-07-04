import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MyAxios from '../../../utils/AxiosInstance';
import useWorkspaces from '../queries/GetWorkspaces';
import useWorkspace from '../queries/GetWorkspace';
import useProjects from '../queries/GetProjects';
import { useListState, useDisclosure } from '@mantine/hooks';
import {
  Navbar,
  Text,
  useMantineTheme,
  Group,
  Button,
  Title,
  Modal,
  TextInput,
  FileInput,
  NavLink,
  ScrollArea,
  rem,
  createStyles,
  UnstyledButton,
  Divider,
  Flex,
  Image,
} from '@mantine/core';
import { DatePickerInput, DateInput, DateTimePicker } from '@mantine/dates';
import { IconPlus, IconPencil } from '@tabler/icons-react';
import { useSelector } from 'react-redux';

export default function WorkspaceViewNav() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [openedModal, { open, close }] = useDisclosure(false);

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
  const tokens = useSelector((state) => state.TokensSlice.tokens);
  const baseURL = useSelector((state) => state.TokensSlice.baseURL);

  const params = useParams();
  console.log('params', params);

  const workspaceID = params.workspaceId;
  // console.log("here id",data[0]?.id);

  // const workspaceNoMimo = data?.find(workspace => workspace?.id == workspaceID);
  // console.log("hereNoMimo",workspaceNoMimo);

  const {
    data: workspaces,
    error: workspacesError,
    isLoading: workspacesLoading,
  } = useWorkspaces();
  const workspaceData = useWorkspace(workspaces, workspaceID);
  console.log('workspaceData', workspaceData);
  const ownerID = workspaceData?.ownerID;

  const addProject = (project) => {
    return MyAxios.post('projects/Add', project, {
      headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'multipart/form-data' },
    });
  };

  const queryClient = useQueryClient();

  const createProjectMutation = useMutation(addProject, {
    onSuccess: (newData) => {
      //  queryClient.setQueryData(['projects'],
      //  (oldData) => {
      //   console.log("oldDataProject", oldData);
      //   return oldData ? [...oldData, newData.data] : [newData.data]
      // },
      //  );
    },
  });

  function createProject(e) {
    e.preventDefault();
    createProjectMutation.mutate({
      name: e.target.projectName.value,
      description: e.target.projectDescription.value,
      start_date: e.target.startDate.value,
      end_date: e.target.endDate.value,
      workspace_id: workspaceID,
    });
    close();
  }
  const navigate = useNavigate();
  function goToProject(projectID) {
    navigate(`/workspaces/workspace/${workspaceID}/project/${projectID}`);
  }

  console.log('workspaceIDType', workspaceID, typeof workspaceData?.id);
  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading,
  } = useProjects(workspaceData?.id);

  console.log('projectsNN', projects);
  const [pro_data, setpro_data] = useState([]);

  const fetchData = async () => {
    // workspaces
    try {
      const response = await MyAxios.get('projects/', {
        headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
        params: { workspaceId: workspaceID },
      });

      if (response.status == 207) {
        setpro_data(response.data);
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
  console.log(pro_data);
  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ md: 700, lg: 300 }}>
      <Group>
        <Flex mih={50} gap="md" justify="space-between" align="center" direction="row" wrap="wrap">
          <Image
            maw={240}
            mx="auto"
            radius="md"
            width={70}
            src={baseURL + workspaceData?.image}
            alt="With default placeholder"
            withPlaceholder
          />
          <Text fz="md" color="black">
            {workspaceData?.name}
          </Text>
          <UnstyledButton
            // onClick={navigateToEditWorkspace}
            size="sm"
            className={classes.plusButton}
          >
            <IconPencil color="gray" />
          </UnstyledButton>
        </Flex>
      </Group>
      <Divider mt={10} />
      <hr />
      <Modal
        opened={openedModal}
        onClose={close}
        title="Create Workspace"
        style={{ overflow: 'scroll' }}
        centered
      >
        <form action="" method="post" onSubmit={createProject}>
          <TextInput
            data-autofocus
            name="projectName"
            placeholder="Project name"
            label="Project name"
            withAsterisk
            required
          />
          <TextInput
            name="projectDescription"
            placeholder="Project description"
            label="Project description"
            withAsterisk
            required
          />
          <DateTimePicker
            popoverProps={{ withinPortal: true }}
            name="startDate"
            label="Start date"
            placeholder="Pick a start date"
            withAsterisk
            required
          />
          <DateTimePicker
            popoverProps={{ withinPortal: true }}
            name="endDate"
            label="End date"
            placeholder="Pick an end date"
            withAsterisk
            required
          />

          <Group
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px',
            }}
          >
            <Button type="submit">Create</Button>

            <Button type="button" onClick={close} color="red">
              Cancel
            </Button>
          </Group>
        </form>
      </Modal>
      <Group position="apart" spacing="xs" mb="md">
        <Title color="gray" order={5}>
          Projects
        </Title>
        <UnstyledButton onClick={open} size="sm" className={classes.plusButton}>
          <IconPlus color="gray" />
        </UnstyledButton>
      </Group>

      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Group position="apart" spacing="xs" mb="md">
          {pro_data ? (
            pro_data.map((project) => (
              <NavLink
                fz="lg"
                color="#868e96"
                key={project.id}
                label={project.name}
                onClick={() => goToProject(project.id)}
              />
              // {/* <img src={baseURL + workspace.image} height="400px" alt="dfsgfdsgfd" /> */}
            ))
          ) : (
            <Text color="gray" fz="sm">
              No workspaces yet, hit the plus button to create one.
            </Text>
          )}
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}
