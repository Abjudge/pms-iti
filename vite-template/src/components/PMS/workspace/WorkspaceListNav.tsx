import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListState, useDisclosure } from '@mantine/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
// import { AddWorkSpace } from '../../../redux/slices/WorkSpacesSlice';
import MyAxios from '../../../utils/AxiosInstance';
import useWorkspaces from '../queries/GetWorkspaces';

import {
  Navbar,
  Text,
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
  Checkbox,
  Stack,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { IconBrandGithubFilled } from '@tabler/icons-react';


export default function WorkspaceListNav() {
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
  const [opened, setOpened] = useState(false);
  const [openedModal, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  // const [workspacesList, setWorkspacesList] = useState([]);
  // const workspaces = useSelector((state) => state.WorkSpacesSlice.workspaces);
  const tokens = useSelector((state) => state.TokensSlice.tokens);
  const user = useSelector((state) => state.TokensSlice.user);

  const dispatch = useDispatch();

  const { classes } = useStyles();





  // console.log("user", tokens);

  const addWorkspace = (workspace) => {
    return MyAxios.post('workspaces/Add', workspace, { headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'multipart/form-data' } })
  }


  const queryClient = useQueryClient();

  const createWorkspaceMutation = useMutation(addWorkspace, {
    onSuccess: (newData) => {
      queryClient.setQueryData(['workspaces'],
        (oldData) => {
          return oldData ? [...oldData, newData.data] : [newData.data]
        },

      );
    },
  });

  function createWorkspace(e) {
    console.log("cheeeeechvalue", e.target.githubIntegration.value);
    e.preventDefault();
    createWorkspaceMutation.mutate({
      name: e.target.name.value,
      description: e.target.description.value,
      image: e.target.image.files[0],
      integrate: e.target.githubIntegration.value,
      user_name: e.target.githubUsername.value,
      token: e.target.githubToken.value,
      owner_id: user.user_id,
    },
    );


    close();
  }
  const navigate = useNavigate();
  function goToWorkspace(workspaceID) {
    navigate(`/workspaces/workspace/${workspaceID}`);
  }

  const { data: workspaces, error, isLoading } = useWorkspaces();



  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ md: 700, lg: 300 }}>
      <Modal opened={openedModal} onClose={close} title="Create Workspace" centered>
        <form action="" method="post" onSubmit={createWorkspace} encType="multipart/form-data">
          <TextInput
            name="name"
            placeholder="Workspace name"
            label="Workspace name"
            withAsterisk
            required
          />
          <TextInput
            name="description"
            placeholder="Workspace description"
            label="Workspace description"
            required
          />
          <FileInput
            name="image"
            label="Workspace image"
            accept="image/*"
            placeholder="Workspace image"
            required
          />
          <Stack spacing="xs">
          <Group mt={20}>
          <Checkbox
              name="githubIntegration"
              label="Integrate with Github?"
              icon={IconBrandGithubFilled}
              value={checked}
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
          />
          </Group>
          <TextInput
            name="githubUsername"
            placeholder="Enter your Github username"
            label="Your Github username"
            disabled = {!checked}
            required = {checked}
          />
          <TextInput
            name="githubToken"
            placeholder="Enter your Github token"
            label="Your Github token"
            disabled = {!checked}
            required = {checked}
          />
          </Stack>
          
          {/* <input type="file" name="image"></input> */}
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
          Workspaces
        </Title>
        <UnstyledButton onClick={open} size="sm" className={classes.plusButton}>
          <IconPlus color="gray" />
        </UnstyledButton>
      </Group>

      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Group position="apart" spacing="xs" mb="md">
          {workspaces ? (
            workspaces.map((workspace) => (

              <NavLink
                fz="lg"
                color="#868e96"
                key={workspace.id}
                label={workspace.name}
                onClick={() => goToWorkspace(workspace.id)}
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
