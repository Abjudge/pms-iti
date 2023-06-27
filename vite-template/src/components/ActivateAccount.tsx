import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Center, Text, Paper, Title, Group, Divider, Loader, Stack } from '@mantine/core';
import { IconMail } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure, useTimeout } from '@mantine/hooks';
import { IconCircleCheckFilled } from '@tabler/icons-react';



const ActivateAccount = () => {

    const { uid, token } = useParams();
    
    const navigate = useNavigate();
    const { start, clear } = useTimeout(() => navigate('/login'), 5000);
    const [opened, handlers] = useDisclosure(false);
    console.log("outside", opened)

    const activeClick = (e) => {
       
        Axios.post('http://localhost:8000/auth/users/activation/', { uid: uid, token: token })
            .then(() => {
                console.log("inside",opened),
                handlers.open(),
                start()
            })
            .catch(err => {
                alert(err.response.data);
            })
    };
    
    return (

        <Center maw={600} h={600} mx="auto">
            

        <Paper sx={{ width: '100%', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} radius="md" p={40}  >
        <Group>
          <MantineLogo size={50} />
        </Group>
        <Divider mt={10} />

        <Group p={10} mt={30}>

                <Title  order={2} weight={500} align="center">Activate Account</Title>
          
                <Text  mt={10} mb={20} ta="center">Please click on the blue button below to activate your account.</Text>
        </Group>
        <Group mt={30} mb={10}>
            {opened ? <Stack> <Group> <IconCircleCheckFilled size={50} style={{color: "#339af0"}} /> <Text>Activated successfully</Text></Group> <Group mt={10} ml={70}><Text>Redirecting to login</Text><Loader size="sm" /></Group> </Stack> : <Button  onClick={activeClick} color="primary">Activate my account</Button>}
                
        </Group>
        
        </Paper>
        </Center>

    )
    }
    
    export default ActivateAccount;