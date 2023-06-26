import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { AddWorkSpace, GetWorkSpaces } from '../../../redux/slices/WorkSpacesSlice';
import MyAxios from '../../../utils/AxiosInstance';

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
  const [values, handlers] = useListState([{ a: 1 }]);
  // const [workspacesList, setWorkspacesList] = useState([]);
  const workspaces = useSelector((state) => state.WorkSpacesSlice.workspaces);
  const fetched = useSelector((state) => state.WorkSpacesSlice.fetched);
  const tokens = useSelector((state) => state.TokensSlice.tokens);
  const user = useSelector((state) => state.TokensSlice.user);
  const baseURL = useSelector((state) => state.TokensSlice.baseURL);

  const dispatch = useDispatch();

  useEffect(() => {
    // fetchData();
    dispatch(GetWorkSpaces(tokens.access));
  }, []);
  const { classes } = useStyles();

  async function createWorkspace(e) {
    console.log(
      '🚀 ~ file: WorkspaceListNav.tsx:128 ~ createWorkspace ~ e.target.image:',
      e.target.image
    );
    console.log(
      '🚀 ~ file: WorkspaceListNav.tsx:128 ~ createWorkspace ~ e.target.image:',
      e.target.image.value
    );

    alert('run create');

    e.preventDefault();
    // Read the form data
    const response = await MyAxios.post(
      'workspaces/Add',
      {
        name: e.target.name.value,
        description: e.target.description.value,
        image: e.target.image.files[0],
        owner_id: user.user_id,
      },
      {
        headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'multipart/form-data' },
      }
    );

    if (response.status == 200) {
      dispatch(AddWorkSpace(response.data));
    } else {
      alert('not succss');
    }
    // setWorkspacesList((prevList) => [...prevList, data]);
    close();
  }
  const navigate = useNavigate();
  function goToWorkspace(id) {
    console.log(id);
    navigate(`/workspaces/workspace/${id}`);
  }
  if (fetched == true) {
    console.log('🚀 ~ file: WorkspaceListNav.tsx:137 ~ WorkspaceListNav ~ workspaces:', workspaces);

    return (
      <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ md: 700, lg: 300 }}>
        <Modal opened={openedModal} onClose={close} title="Create Workspace" centered>
          <form action="" method="post" onSubmit={createWorkspace} encType="multipart/form-data">
            <TextInput
              key={values.length}
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
            ></TextInput>
            <FileInput
              name="image"
              label="Workspace image"
              accept="image/*"
              placeholder="Workspace image"
              required
            ></FileInput>
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
            {fetched ? (
              workspaces.map((workspace) => (
                <>
                  <NavLink
                    fz="lg"
                    color="#868e96"
                    key={workspace.id}
                    label={workspace.name}
                    onClick={() => goToWorkspace(workspace.id)}
                  />
                  {/* <img src={baseURL + workspace.image} height="400px" alt="dfsgfdsgfd" /> */}
                </>
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
}
