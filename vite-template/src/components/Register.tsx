import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
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
} from '@mantine/core';
import { check } from 'prettier';

export default function Register() {
    const navigate = useNavigate();
    const location = useLocation();


    const form = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),

        },
    });

    return (

        <Center w={500} maw={600} h={600} mx="auto">

            <Paper sx={{ width: '100%', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }} radius="md" p="xl"  >
                <Text size="lg" weight={500}>
                    Register
                </Text>



                <Divider my="lg" />

                <form onSubmit={form.onSubmit(() => { })}>
                    <Stack>
                        <TextInput
                            required
                            label="First Name"
                            placeholder="Your First Name"
                            value={form.values.firstName}
                            onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                            radius="md"
                        />
                        <TextInput
                            required
                            label="Last Name"
                            placeholder="Your First Name"
                            value={form.values.lastName}
                            onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                            radius="md"
                        />

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                        />

                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                            height="100%"
                        >
                        </Anchor>
                        <Button type="submit" radius="xl">Register</Button>
                    </Group>
                </form>
            </Paper>
        </Center>
    );
}
