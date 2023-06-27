import { useState, useRef } from 'react';
import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    ActionIcon,
    Anchor,
    ScrollArea,
    useMantineTheme,
    Button,
    Flex,
    Container,
    Modal,
    TextInput,
    Autocomplete,
    Loader,
    NativeSelect,
    Center,
  } from '@mantine/core';
  import { IconPencil, IconTrash } from '@tabler/icons-react';
  import { useListState, useDisclosure } from '@mantine/hooks';



  
  
  const jobColors: Record<string, string> = {
    admin: 'red',
    developer: 'blue',
    tester: 'green',
  };


  
  export default function WorkspaceViewMain() {
    const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${val}@${provider}`));
      }, 1000);
    }
  };
    const theme = useMantineTheme();
    const [openedModal, { open, close }] = useDisclosure(false);
    const userData = [
        {
            "avatar": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
            "name": "Robert Wolfkisser",
            "job": "Admin",
            "email": "rob_wolf@gmail.com",
          },
          {
            "avatar": "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
            "name": "Jill Jailbreaker",
            "job": "Developer",
            "email": "jj@breaker.com",
          },
          {
            "avatar": "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
            "name": "Henry Silkeater",
            "job": "Developer",
            "email": "henry@silkeater.io",
          },
          {
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
            "name": "Bill Horsefighter",
            "job": "Tester",
            "email": "bhorsefighter@gmail.com",
          },
          {
            "avatar": "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
            "name": "Jeremy Footviewer",
            "job": "Tester",
            "email": "jeremy@foot.dev",
          }
          
      ];
    const rows = userData.map((item) => (
      <tr key={item.name}>
        <td>
          <Group spacing="sm">
            <Avatar size={30} src={item.avatar} radius={30} />
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </td>
  
        <td>
          <Badge
            color={jobColors[item.job.toLowerCase()]}
            variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
          >
            {item.job}
          </Badge>
        </td>
        <td>
          <Anchor component="button" size="sm">
            {item.email}
          </Anchor>
        </td>
 
        <td>
          <Group spacing={0} position="right">
            <ActionIcon>
              <IconPencil size="1rem" stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="red">
              <IconTrash size="1rem" stroke={1.5} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ));
  
    return (
        <Container>
    <Flex
      mih={50}
      gap="md"
      justify="space-between"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Text size="xl" weight={500}>Workspace Members </Text>
      <Button onClick={open}>Add Members</Button>
    </Flex>
    <Modal opened={openedModal} onClose={close} title="Add members to workspace" centered>
        <form action="" method="post">

        <Autocomplete
        required
        value={value}
        data={data}
        onChange={handleChange}
        rightSection={loading ? <Loader size="1rem" /> : null}
        label="Enter member email"
        placeholder="Your email"
    />
          <NativeSelect
          required
      data={['Developer', 'Tester']}
      label="Select member role"
      withAsterisk
    />
     

          <Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>

            <Button type="submit">ِAdd</Button>


            <Button type="button" onClick={close} color="red">Cancel</Button>
          </Group>
        </form>
      </Modal>
      <ScrollArea h={500}>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Email</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows : <Center maw={400} h={100} mx="auto"> <Text color='gray' fz="sm">No members yet, hit the add members button to add members.</Text>      </Center>}
            </tbody>
        </Table>
      </ScrollArea>
      </Container>
    );
  }