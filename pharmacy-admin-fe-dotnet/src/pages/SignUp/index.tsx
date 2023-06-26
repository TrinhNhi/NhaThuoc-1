import { SignUpPayload } from '@/configs/api/payload';
import { ROUTER } from '@/configs/router';
import { useAuthContext } from '@/hooks/context';
import { IUserRole } from '@/types/models/IUser';
import { Box, Card, Center, Stack, Text, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const {
    signup,
    state: { isFetching }
  } = useAuthContext();

  const initialValues: SignUpPayload = {
    fullName: '',
    username: '',
    password: '',
    role: IUserRole.STAFF
  };
  const form = useForm({ initialValues });
  return (
    <Box pos="relative">
      <Text tt="uppercase" align="center" fw="700" fz={28}>
        Đăng ký tài khoản
      </Text>
      <Text align="center" color="dimmed" fz="xl">
        Chào mừng bạn đến với hệ thống quản lý nhà thuốc
      </Text>
      <Center mt={'sm'}>
        <Card shadow="md" w={360}>
          <form
            onSubmit={form.onSubmit((values) => {
              signup(values, {
                onSuccess: () => navigate(ROUTER.LOGIN)
              });
            })}
          >
            <Stack>
              <TextInput label="Họ tên" placeholder="Nhập họ tên..." icon={<IconUser size={14} />} {...form.getInputProps('fullName')} />
              <TextInput label="Tên đăng nhập" placeholder="Nhập tên đăng nhập..." icon={<IconUser size={14} />} {...form.getInputProps('username')} />
              <TextInput label="Mật khẩu" autoComplete="new-password" type="password" placeholder="Nhập mật khẩu..." icon={<IconLock size={14} />} {...form.getInputProps('password')} />
              <Button loading={isFetching} color="blue.9" variant="filled" fullWidth type="submit">
                Đăng ký
              </Button>
              <Text onClick={() => navigate(ROUTER.LOGIN)} fz={'xs'} sx={{cursor: 'pointer'}} align='right'>
                Đã có tài khoản? Đăng nhập
              </Text>
            </Stack>
          </form>
        </Card>
      </Center>
    </Box>
  );
};

export default SignUp;
