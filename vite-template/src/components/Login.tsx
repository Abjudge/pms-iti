import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Center,
  Image,
} from '@mantine/core';
import Logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  refreshTokens,
  setLoggedIn,
  setRunningInterval,
  setTokens,
  setUser,
  logout,
  updateFull,
  setloggedout,
} from '../redux/slices/TokensSlice';
export default function Login() {
  // const location = useLocation();

  const loggedin = useSelector((state) => state.TokensSlice.loggedin);
  const intervaltime = useSelector((state) => state.TokensSlice.intervaltime);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const { data } = await axios.post("http://127.0.0.1:8000/auth/jwt/refresh/", {
  //   "refresh": refresh,

  // }
  // );

  const loginUser = async (e) => {
    e.preventDefault();

    if (!loggedin) {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/auth/jwt/create/',
          {
            email: e.target.email.value,
            password: e.target.password.value,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );
        // ddd

        const { access, refresh } = response.data;
        if (response.status === 200) {
          dispatch(updateFull(true));
          dispatch(setUser(jwt_decode(access)));
          dispatch(setTokens({ access, refresh }));

          localStorage.setItem('Tokens', await JSON.stringify(response.data));
          navigate('/');

          const interval = setInterval(() => {
            dispatch(refreshTokens(refresh));
          }, intervaltime);

          console.log('🚀 ~ file: LoginPage.jsx:52 ~ interval ~ interval:', interval);

          dispatch(setRunningInterval(interval));
          dispatch(setLoggedIn());
          dispatch(setloggedout());

          console.log('🚀 ~ file: LoginPage.jsx:55 ~ loginUser ~ refresh:', refresh);
        } else {
          alert('Something went wrong!');
          dispatch(logout());
        }
      } catch (error) {
        // alert('Something faild to make request !' + error.response.status);
        dispatch(logout());
      }
    } else {
      alert("you 're logged in");
    }
  };

  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      terms: true,
    },
  });

  return (
    <Center maw={400} h={600} mx="auto">
      <Paper
        sx={{ width: '100%', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }}
        radius="md"
        p="xl"
      >
                      <Center mb={30}>
            <Image src={Logo} width={200} />
            </Center>
        <Text size="lg" weight={500}>
          Login To Your Account
        </Text>

        <Divider my="lg" />

        <form onSubmit={loginUser}>
          <Stack>
            <TextInput
              required
              label="Email"
              name="email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              name="password"
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
              // onClick={() => toggle()}
              size="xs"
              height="100%"
            >
              {' '}
            </Anchor>
            <Button type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}
