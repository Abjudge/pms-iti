import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  Stack,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useListState, useDisclosure, useDebouncedValue } from '@mantine/hooks';
import MyAxios from '../../../utils/AxiosInstance';
import useWorkspaceMembers from '../queries/GetWorkspaceMembers';

const jobColors: Record<string, string> = {
  leader: 'red',
  developer: 'blue',
  tester: 'green',
};

export default function WorkspaceViewMain() {
  const theme = useMantineTheme();
  const [openedModal, { open, close }] = useDisclosure(false);
  const [openedConfirm, { open: openConfirm, close: closeConfirm }] = useDisclosure(false);

  // search users
  const tokens = useSelector((state) => state.TokensSlice.tokens);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 200);

  const { data, isLoading } = useQuery({
    queryKey: ['userSearch', debouncedSearch],
    queryFn: () => {
      if (debouncedSearch.length === 0) {
        return [];
      }

      return MyAxios.get(`/workspaces/searchmembers/${debouncedSearch}`, {
        headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
      }).then((response) => {
        if (!response?.data) {
          return [];
        }
        return response.data.map((item) => ({ value: item.email, id: item.id }));
      });
    },
    initialData: [],
  });
  let member_id = 0;
  if (data.length) {
    member_id = data[0].id;
  }

  const params = useParams();
  console.log('params', params);

  const workspaceID = params.workspaceId;

  const addWorkspaceMember = (member) => {
    return MyAxios.post(`workspaces/${workspaceID}/addmember`, member, {
      headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'multipart/form-data' },
    });
  };

  const queryClient = useQueryClient();

  const addWorkspaceMemberMutation = useMutation(addWorkspaceMember, {
    onSuccess: (newData) => {
      queryClient.setQueryData(['projects'], (oldData) => {
        return oldData ? [...oldData, newData.data] : [newData.data];
      });
    },
  });

  function addMember(e) {
    e.preventDefault();
    addWorkspaceMemberMutation.mutate({
      user_id: member_id,
      Workspace_id: workspaceID,
      role: e.target.role.value,
    });

    close();
  }

  const role_conv = (letter) => {
    if (letter == 'd') {
      return 'Developer';
    } else if (letter == 'l') {
      return 'Leader';
    } else if (letter == 't') {
      return 'Tester';
    }
  };
  const [del_id, setdel_id] = useState(0);
  const { data: workspaceMembers } = useWorkspaceMembers(workspaceID);
  console.log('workspaceMembers', workspaceMembers);
  console.log('🚀 ~ file: WorkspaceViewMain.tsx:115 ~ delmember ~ del_id:', del_id);
  const delmember = async (del_id) => {
    const response = await MyAxios.delete(`workspaces/members/deleteMember/${del_id}`, {
      headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
    });
    closeConfirm();
    console.log('🚀 ~ file: WorkspaceViewMain.tsx:120 ~ delmember ~ response:', response);
  };
  return (
    <Container>
      <Flex mih={50} gap="md" justify="space-between" align="center" direction="row" wrap="wrap">
        <Text size="xl" weight={500}>
          Workspace Members{' '}
        </Text>
        <Button onClick={open}>Add Members</Button>
      </Flex>
      <Modal opened={openedModal} onClose={close} title="Add members to workspace" centered>
        <form action="" method="post" onSubmit={addMember}>
          <Autocomplete
            required
            data={data ?? []}
            value={search}
            onChange={setSearch}
            rightSection={isLoading ? <Loader size="1rem" /> : null}
            label="Enter member email"
            placeholder="Your email"
          />
          <NativeSelect
            required
            name="role"
            data={[
              { value: 'd', label: 'Developer' },
              { value: 't', label: 'Tester' },
            ]}
            label="Select member role"
            withAsterisk
          />

          <Group
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px',
            }}
          >
            <Button type="submit">ِAdd</Button>

            <Button type="button" onClick={close} color="red">
              Cancel
            </Button>
          </Group>
        </form>
      </Modal>
      <Modal opened={openedConfirm} onClose={closeConfirm}>
        <Text>Are you sure you want to delete this member?</Text>
        <Group
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px',
          }}
        >
          <Button
            type="button"
            onClick={() => {
              delmember(del_id);
            }}
            color="red"
          >
            Delete
          </Button>
          <Button type="button" onClick={closeConfirm}>
            Cancel
          </Button>
        </Group>
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
            {workspaceMembers?.map((item) => (
              <tr key={item.id}>
                <td>
                  <Group spacing="sm">
                    <Text fz="sm" fw={500}>
                      {item.first_name + ' ' + item.last_name}
                    </Text>
                  </Group>
                </td>

                <td>
                  <Badge
                    color={jobColors[role_conv(item.role).toLowerCase()]}
                    variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
                  >
                    {role_conv(item.role)}
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
                    <ActionIcon
                      color="red"
                      onClick={() => {
                        setdel_id(item.id);
                        openConfirm();
                      }}
                    >
                      <IconTrash size="1rem" stroke={1.5} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            )) || []}
          </tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
}
