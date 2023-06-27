import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { IconPlus, IconPencil, IconChevronDown, IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight, IconUserCircle, IconLogout2 } from '@tabler/icons-react';

export default function WorkspaceViewNav() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [openedModal, { open, close }] = useDisclosure(false);
  const [values, handlers] = useListState([{ a: 1 }]);
  const [workspacesList, setWorkspacesList] = useState([]);

  const useStyles = createStyles((theme) => ({
    header: {
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
      borderBottom: 0,
    },

    avatar: {
      padding: 6,
      cursor: 'pointer',
      '&:hover': {
        borderRadius: theme.radius.xl,
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
      },
    },


    inner: {
      height: rem(56),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    links: {
      [theme.fn.smallerThan('sm')]: { // override default link color
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

  function createWorkspace(e) {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    setWorkspacesList(prevList => [...prevList, data]);
    close();
  }

  const navigate = useNavigate();

  function goToWorkspace(e) {
    console.log(e.target.textContent);
    navigate(`/workspace/${e.target.textContent}`);
  }

    function navigateToEditWorkspace() {
        navigate(`/workspaces/workspace/edit`);
    }

  const workspaces = workspacesList.map((workspace) => <NavLink fz="lg" color="#868e96" key={workspace} label={workspace.workspaceName} onClick={goToWorkspace} />);
  console.log(workspaces);

  return (

    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ md: 700, lg: 300 }}>
        <Group  >
        <Flex
      mih={50}
      gap="md"
      justify="space-between"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Image maw={240} mx="auto" radius="md" width={70}  src={null} alt="With default placeholder" withPlaceholder />       
        <Text fz="md" color="black" >Workspace name</Text> 
        <UnstyledButton onClick={navigateToEditWorkspace} size="sm" className={classes.plusButton}>
          <IconPencil color='gray' />
        </UnstyledButton>
      </Flex>
      </Group>
        <Divider mt={10} />
      <hr />
      <Modal opened={openedModal} onClose={close} title="Create Workspace" centered>
        <form action="" method="post" onSubmit={createWorkspace}>

          <TextInput
            key={values.length}
            name='workspaceName'
            placeholder="Workspace name"
            label="Workspace name"
            withAsterisk
            required
          />
          <TextInput
            placeholder="Workspace description"
            label="Workspace description"
          >
          </TextInput>
          <FileInput
            label="Workspace image"
            accept="image/*"
            placeholder="Workspace image"
          >
          </FileInput>

          <Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>

            <Button type="submit">Create</Button>


            <Button type="button" onClick={close} color="red">Cancel</Button>
          </Group>
        </form>
      </Modal>
      <Group position="apart" spacing="xs" mb="md">
        <Title color="gray" order={5}>Projects</Title>
        <UnstyledButton onClick={open} size="sm" className={classes.plusButton}>
          <IconPlus color='gray' />
        </UnstyledButton>
      </Group>

      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Group position="apart" spacing="xs" mb="md">

          {workspaces.length ? workspaces : <Text color='gray' fz="sm">No projects yet, hit the plus button to create one.</Text>}

        </Group>
      </Navbar.Section>

 

    </Navbar>
  );
}
