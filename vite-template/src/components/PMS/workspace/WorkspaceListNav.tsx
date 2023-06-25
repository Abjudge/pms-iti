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
import { GetWorkSpaces } from '../../../redux/slices/WorkSpacesSlice';
import { AddWorkSpace } from '../../../redux/slices/AddWorkSpace.jsx';

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
  const addWorkspace = useSelector((state) => state.AddWorkSpaceSlice.workspace);
  const addFetched = useSelector((state) => state.AddWorkSpaceSlice.fetched);

  const dispatch = useDispatch();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  // }

  useEffect(() => {
    // fetchData();
    // dispatch(AddWorkSpace(tokens.access));
    dispatch(GetWorkSpaces(tokens.access));
    console.log(tokens.access);
  }, []);
  const { classes } = useStyles();
  const createWorkspace = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    const data = Object.fromEntries(formData.entries());
    dispatch(AddWorkSpace(data, tokens.access));
  };
  // function createWorkspace(e) {
  //     e.preventDefault();
  //     // Read the form data
  //     const form = e.target;
  //     const formData = new FormData(form);
  //     const data = Object.fromEntries(formData.entries());
  //     // setWorkspacesList((prevList) => [...prevList, data]);
  //     close();
  //   }
  //   // const navigate = useNavigate();
  //   // function goToWorkspace(e) {
  //   //   console.log(e.target.textContent);
  //   //   navigate(`/workspace/${e.target.textContent}`);
  // }
  if (fetched == true) {
    console.log('🚀 ~ file: WorkspaceListNav.tsx:137 ~ WorkspaceListNav ~ workspaces:', workspaces);

    return (
      <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ md: 700, lg: 300 }}>
        <Modal opened={openedModal} onClose={close} title="Create Workspace" centered>
          <form action="" method="post" onSubmit={createWorkspace}>
            <TextInput
              key={values.length}
              type="text"
              name="workspaceName"
              placeholder="Workspace name"
              label="Workspace name"
              withAsterisk
              required
            />
            <TextInput
              name="workspaceDesc"
              placeholder="Workspace description"
              label="Workspace description"
            ></TextInput>
            <FileInput
              name="WorkspaceImage"
              label="Workspace image"
              accept="image/*"
              placeholder="Workspace image"
            ></FileInput>
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
                <NavLink
                  fz="lg"
                  color="#868e96"
                  key={workspace.id}
                  label={workspace.name}
                  // onClick={goToWorkspace}
                />
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
