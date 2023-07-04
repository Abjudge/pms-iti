import {
  Button,
  Container,
  createStyles,
  Group,
  rem,
  Text,
  ScrollArea,
  Flex,
  Stack,
  Center,
  Title,
  Modal,
  TextInput,
  NativeSelect,
  NumberInput,
} from '@mantine/core';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { DatePickerInput, DateInput, DateTimePicker } from '@mantine/dates';

import { useListState, useDisclosure } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useWorkspaceMembers from '../queries/GetWorkspaceMembers';
import MyAxios from '../../../utils/AxiosInstance';
import { IconXboxA } from '@tabler/icons-react';
import useToDoTasks from '../queries/GetToDoTasks';

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },
}));

interface DndListProps {
  data: {
    position: number;
    mass: number;
    symbol: string;
    name: string;
  }[];
}

export default function ToDo() {
  const { classes, cx } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const tokens = useSelector((state) => state.TokensSlice.tokens);

  const params = useParams();

  const workspaceID = params.workspaceId;

  const { data: workspaceMembers } = useWorkspaceMembers(workspaceID);
  console.log('in tasks', workspaceMembers);
  const developers = workspaceMembers?.filter((member) => member.role === 'd');
  const testers = workspaceMembers?.filter((member) => member.role === 't');
  console.log('in tasks developers', developers);
  const developersEmails = developers?.map((developer) => developer.email);
  const testersEmails = testers?.map((tester) => tester.email);

  // get devloper's id by email

  const projectID = params.projectId;

  const addTask = (task) => {
    return MyAxios.post('task/create/', task, {
      headers: { Authorization: `JWT ${tokens.access}` },
    });
  };

  const queryClient = useQueryClient();

  function changeStatus(item) {
    MyAxios.put(`task/${item.id}/start/`, item, {
      headers: { Authorization: `JWT ${tokens.access}` },
    }).then((res) => {
      console.log(res.data);
      queryClient.invalidateQueries(['toDoTasks']);
      queryClient.invalidateQueries(['inProgressTasks']);
    });
  }

  const { data: tasks } = useToDoTasks(projectID);

  const [state, handlers] = useListState(tasks);
  const createTaskMutation = useMutation(addTask, {
    onSuccess: (newData) => {
      queryClient.setQueryData(['toDoTasks'], (oldData) =>
        oldData ? [...oldData, newData.data] : [newData.data]
      );
    },
  });

  function createTask(e) {
    const developerId = developers?.find(
      (developer) => developer.email === e.target.developer.value
    ).user_id;
    const testerId = testers?.find((tester) => tester.email === e.target.tester.value).user_id;
    e.preventDefault();
    createTaskMutation.mutate({
      name: e.target.name.value,
      description: e.target.description.value,
      start_date: e.target.startDate.value,
      end_date: e.target.endDate.value,
      estimated_duration: e.target.estimatedDuration.value,
      developer_id: developerId,
      tester_id: testerId,
      project_id: projectID,
    });

    handlers.append({
      id: state.length + 1,
      name: e.target.name.value,
      description: e.target.description,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
    });

    close();
  }

  const items = tasks.map((item, index) => (
    <Draggable key={item.id} index={item.id} draggableId={item.name}>
      {(provided, snapshot) => (
        <Container
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Group position="apart" p={20}>
            <Stack>
              <Text>{item.name}</Text>
              <Text color="dimmed" size="sm">
                description: {item.description}
              </Text>
              <Text color="dimmed" size="sm">
                Start Date: {item.start_date}
              </Text>
              <Text color="dimmed" size="sm">
                End Date: {item.end_date}
              </Text>
            </Stack>
            <Group>
              <Button
                onClick={() => {
                  changeStatus(item);
                }}
              >
                Start
              </Button>
            </Group>
          </Group>
        </Container>
      )}
    </Draggable>
  ));
  return (
    <Stack
      bg="#3584e4"
      p={20}
      sx={{ borderRadius: '5px', boxShadow: '0px 10px 15px 8px rgba(0,0,0,0.1)' }}
    >
      <Center>
        <Title order={2} c="White">
          To Do
        </Title>
      </Center>
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          handlers.reorder({ from: source.index, to: destination?.index || 0 })
        }
      >
        <ScrollArea w={300} h={400}>
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Modal opened={opened} onClose={close} title="Create new task">
            <form action="" method="post" onSubmit={createTask}>
              <TextInput
                name="name"
                placeholder="Enter task name"
                label="Task name"
                withAsterisk
                required
              />
              <TextInput
                name="description"
                placeholder="Enter task description"
                label="Task description"
                required
              />

              <DateTimePicker
                name="startDate"
                popoverProps={{ withinPortal: true }}
                label="Start date"
                placeholder="Pick a start date"
                withAsterisk
                required
              />
              <DateTimePicker
                name="endDate"
                popoverProps={{ withinPortal: true }}
                label="End date"
                placeholder="Pick an end date"
                withAsterisk
                required
              />
              <NumberInput
                name="estimatedDuration"
                placeholder="Enter estimated duration in hours"
                label="Esitmated Duration"
                min={1}
                withAsterisk
              />
              <NativeSelect
                required
                name="developer"
                data={developersEmails}
                label="Task Developer"
                description="Select a developer for this task"
                withAsterisk
              />
              <NativeSelect
                required
                name="tester"
                data={testersEmails}
                label="Task Tester"
                description="Select a tester for this task"
                withAsterisk
              />

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
        </ScrollArea>
        <Button bg="#99c1f1" onClick={open}>
          Add{' '}
        </Button>
      </DragDropContext>
    </Stack>
  );
}
