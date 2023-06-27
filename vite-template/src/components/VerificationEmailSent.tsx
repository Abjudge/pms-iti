import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Center, Text, Paper, Title } from "@mantine/core";
import { IconMail } from '@tabler/icons-react';



export default function VerificationEmailSent() {
    return (
      
        <Center maw={500} h={600} mx="auto">
            

        <Paper sx={{ width: '100%', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} radius="md" p={30}  >
        <IconMail size={100} color="#339af0" />
                <Title mt={10} order={2} weight={500} align="center">Verification Email Sent</Title>
          
                <Text  mt={30} >Thanks for registeration, an email with an activation link sent to your email.</Text>
                <Text mt={20} mb={20} ><span style={{fontWeight: "bold"}}>To be able to login</span> please go to your mail and click on this link to activate your account.</Text>
            
        </Paper>
        </Center>
    
    )
}