import React from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useToggle, upperFirst, useDisclosure } from '@mantine/hooks';
import { useForm, matchesField } from '@mantine/form';
import Logo from '../assets/logo.png';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
    Container,
    Flex,
    Center,
    LoadingOverlay,
    Box,
    Loader,
    Image,
   
} from '@mantine/core';
import { check } from 'prettier';
import VerificationEmailSent from './VerificationEmailSent';

export default function Register() {

    const navigate = useNavigate();
    const location = useLocation();

    const mutation = useMutation(newUser => {
        return axios.post('http://127.0.0.1:8000/auth/users/', newUser)
    })



    const form = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
            confirmPassword: matchesField('password', 'Passwords are not the same'),

        },
    });


    const registerUser = (values: typeof form.values) => {
        mutation.mutate({
            email: values.email,
            first_name: values.firstName,
            last_name: values.lastName,
            password: values.password,
            re_password: values.confirmPassword,
        });


    };

    const handleError = (errors: typeof form.errors) => {
        console.log('errors', errors);
    };




    return (
       
        <Center w={500} maw={600} h={600} mx="auto" >






            <Paper sx={{ width: '100%', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }} radius="md" p="xl" mt={50}  >
                <Center mb={30}>
            <Image src={Logo} width={200} />
            </Center>
           

                <Text size="lg" weight={500}>
                    Register Your Account
                </Text>



                <Divider my="lg" />


                <form onSubmit={form.onSubmit(registerUser, handleError)}>

                    {mutation.isLoading && <LoadingOverlay visible ></LoadingOverlay>}


                    <Stack>
                        <TextInput
                            required
                            name="first_name"
                            label="First Name"
                            placeholder="Your First Name"
                            value={form.values.firstName}
                            onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                            radius="md"
                        />
                        <TextInput
                            required
                            name="last_name"
                            label="Last Name"
                            placeholder="Your Last Name"
                            value={form.values.lastName}
                            onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                            radius="md"
                        />

                        <TextInput
                            required
                            name="email"
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                        />
                        {mutation.isError && <Text color="red">Email already exists</Text>}

                        <PasswordInput
                            required
                            name="password"
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                        />
                        <PasswordInput
                            required
                            name="re_password"
                            label="Confirm Password"
                            value={form.values.confirmPassword}
                            placeholder="Re Enter Your password"
                            onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                            error={form.errors.confirmPassword && 'Passwords are not the same'}
                            radius="md"
                        />

                    </Stack>

                    <Group position="apart" mt="xl">
                        {/* <Anchor
                                        component="button"
                                        type="button"
                                        color="dimmed"
                                        onClick={() => toggle()}
                                        size="xs"
                                        height="100%"
                                    >
                                    </Anchor> */}
                        <Button type="submit" radius="xl">Register</Button>
                    </Group>
                    {mutation.isSuccess && navigate("/VerificationEmail")}
                </form>
            </Paper>


        </Center>
      
    );
}
