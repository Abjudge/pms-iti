import React from "react";

import { Center, Title } from '@mantine/core';


export default function WorkspaceListMain() {
    interface CenteredTitleProps {
        title: string;
      }
      function CenteredTitle({ title }: CenteredTitleProps) {
        return (
          <Center h="100%" w="100%">
            <Title order={2}>{title}</Title>
          </Center>
        );
      }
    return (
      <CenteredTitle title="Choose a workspace or add a new one from the + button to start" />
    );
}