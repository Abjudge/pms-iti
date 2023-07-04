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
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import useTestingTasks from '../queries/GetTestingTasks';
import MyAxios from '../../../utils/AxiosInstance';

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

export default function Testing() {
  const { classes, cx } = useStyles();

  const params = useParams();
  const projectID = params.projectId;
  const tokens = useSelector((state) => state.TokensSlice.tokens);
  const queryClient = useQueryClient();

  console.log('in testinggggggggggggggggggggg', projectID);

  function changeToFailed(item) {
    MyAxios.put(`task/${item.id}/start/`, item, {
      headers: { Authorization: `JWT ${tokens.access}` },
    }).then((res) => {
      queryClient.invalidateQueries(['testingTasks']);
      queryClient.invalidateQueries(['inProgressTasks']);
    });
  }

  function changeToDone(item) {
    MyAxios.put(`task/${item.id}/done/`, item, {
      headers: { Authorization: `JWT ${tokens.access}` },
    }).then((response) => {
      queryClient.invalidateQueries(['testingTasks']);
      queryClient.invalidateQueries(['doneTasks']);
    });
  }

  const { data: tasks } = useTestingTasks(projectID);
  console.log('in tasks', tasks);
  const [state, handlers] = useListState(tasks);

  const items = tasks.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.name}>
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
                title: {item.name}
              </Text>
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
                bg="#e01b24"
                onClick={() => {
                  changeToFailed(item);
                }}
              >
                Failed
              </Button>
              <Button
                bg="#33d17a"
                onClick={() => {
                  changeToDone(item);
                }}
              >
                Done
              </Button>
            </Group>
          </Group>
        </Container>
      )}
    </Draggable>
  ));
  return (
    <Stack
      bg="#9141ac"
      p={20}
      sx={{ borderRadius: '5px', boxShadow: '0px 10px 15px 8px rgba(0,0,0,0.1)' }}
    >
      <Center>
        <Title order={2} c="White">
          Testing
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
        </ScrollArea>
      </DragDropContext>
    </Stack>
  );
}
