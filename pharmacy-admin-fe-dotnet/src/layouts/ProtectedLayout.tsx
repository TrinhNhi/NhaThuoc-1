import appIcon from '@/assets/icons/db.svg';
import CustomLoader from '@/components/custom/CustomLoader';
import { ROUTER } from '@/configs/router';
import { useAuthContext } from '@/hooks/context';
import {
  Anchor,
  AppShell,
  Avatar,
  Box,
  Button,
  Group,
  Header,
  Image,
  Navbar,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
  useMantineTheme
} from '@mantine/core';
import { IconBuildingFactory2, IconDatabase, IconLogout, IconSubscript, IconTruckDelivery } from '@tabler/icons-react';
import { Suspense } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

interface NavLinkProps {
  icon: JSX.Element;
  color: string;
  label: string;
  to: string;
}

const navLinks: NavLinkProps[] = [
  {
    icon: <IconSubscript size="1rem" />,
    color: 'yellow',
    label: 'Quản Lý Công Thức Số Lượng',
    to: ROUTER.PROPERTY
  },
  {
    icon: <IconBuildingFactory2 size="1rem" />,
    color: 'red',
    label: 'Quản Lý Kho Hàng',
    to: ROUTER.DRUGS
  },
  {
    icon: <IconDatabase size="1rem" />,
    color: 'teal',
    label: 'Quản Lý Đơn Hàng',
    to: ROUTER.ORDERS
  },
  {
    icon: <IconTruckDelivery size="1rem" />,
    color: 'grape',
    label: 'Quản Lý Nhà Phân Phối',
    to: ROUTER.SUPPLIERS
  }
];

const NavLink = ({ icon, color, label, to }: NavLinkProps) => {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => navigate(to, { replace: true })}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
        }
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const User = () => {
  const theme = useMantineTheme();

  const user = JSON.parse(localStorage.getItem('authUser') || '');
  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`
      }}
    >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
          }
        }}
      >
        <Group>
          <Avatar radius="xl" />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {user.fullname}
            </Text>
            <Text color="dimmed" size="xs">
              {user.role}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
    </Box>
  );
};

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    navigate(ROUTER.LOGIN);
    logout();
  };

  if (!Boolean(localStorage.getItem('authUser'))) {
    return <Navigate to={ROUTER.LOGIN} />;
  }

  return (
    <>
      <AppShell
        styles={{
          main: {
            maxWidth: 'calc(100vw - 32px)'
          }
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={true} width={{ sm: 200, lg: 300 }}>
            <Navbar.Section grow mt="0">
              <div>
                {navLinks.map((link) => (
                  <NavLink {...link} key={link.label} />
                ))}
              </div>
            </Navbar.Section>
            <Navbar.Section>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60}>
            <Group position="apart" sx={{ height: '100%' }} px={20}>
              <Group>
                <Anchor href={ROUTER.DASHBOARD}>
                  <Image src={appIcon} height={32} width={32} />
                </Anchor>
                <Text fw={600} fz="lg">
                  Hệ Thống Quản Lý Nhà Thuốc
                </Text>
              </Group>
              <Group>
                <Button onClick={handleLogout} variant="subtle" color="red" leftIcon={<IconLogout size={20} />}>
                  Đăng xuất
                </Button>
              </Group>
            </Group>
          </Header>
        }
      >
        <Suspense fallback={<CustomLoader />}>
          <Outlet />
        </Suspense>
      </AppShell>
    </>
  );
};

export default ProtectedLayout;
