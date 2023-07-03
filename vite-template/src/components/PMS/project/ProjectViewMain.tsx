import { Button, Container, createStyles, Group, rem, Text, ScrollArea, Flex, Stack, Center, Title } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ToDo from '../tasks/ToDo';
import InProgress from '../tasks/InProgress';
import Testing from '../tasks/Testing';
import Done from '../tasks/Done';

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

export default function DndListHandle() {

  const toDo = [
    { "id": 1, "name": "Task1", "startDate": "2021-09-01", "endDate": "2021-09-30",},
    { "id": 2, "name": "Task2", "startDate": "2021-09-01", "endDate": "2021-09-30",},
    { "id": 3, "name": "Task3", "startDate": "2021-09-01", "endDate": "2021-09-30",},
    { "id": 4, "name": "Task4", "startDate": "2021-09-01", "endDate": "2021-09-30",},
    { "id": 5, "name": "Task5", "startDate": "2021-09-01", "endDate": "2021-09-30",},
  ];
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(toDo);

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.name}>
    {(provided, snapshot) => (
      <div
        className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        
        <div>
          <Text>{item.name}</Text>
          <Text color="dimmed" size="sm">
            Start Date: {item.startDate} 
          </Text>
            <Text color="dimmed" size="sm">
            End Date: {item.endDate}
            </Text>
        </div>
      </div>
    )}
  </Draggable>
  ));

  return (

    <Container p={20}>
   
<Flex 
         
          gap="xl"
          justify="space-between"
          align="center"
          direction="row"  
    >

      <ToDo />
    
      <InProgress />

      <Testing />

      <Done />

    </Flex>
    </Container>

   
  );
}