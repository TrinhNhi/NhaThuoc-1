import { CreateOrderPayload, OrderDrug } from '@/configs/api/payload';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { DrugActions } from '@/redux/reducers/drug/drug.action';
import { PropertyActions } from '@/redux/reducers/property/property.action';
import {
  ActionIcon,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Header,
  Modal,
  Pagination,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  createStyles,
  rem
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { IconChecks, IconPhotoSearch, IconPill, IconSearch, IconX } from '@tabler/icons-react';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import DrugCard from './components/DrugCard';
import ModalDropZone from './components/ModalDropZone';
import OrderedDrugCard from './components/OrderedDrugCard';
import { NotiType, renderNotification } from '@/utils/notifications';
import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { IDrugStatus } from '@/types/models/IDrug';

const Dashboard = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const { drugs } = useAppSelector((state) => state.drug);

  const [opened, { close, open }] = useDisclosure();

  const [query, setQuery] = useState('');
  const [records, setRecords] = useState(drugs);
  const [isFetchingCreateOrder, setIsFetchingCreateOrder] = useState(false);
  const [isSearchByImage, setIsSearchByImage] = useState(false);
  const [orderedDrugs, setOrderedDrugs] = useState<OrderDrug[]>([]);
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setRecords(
      drugs
        .filter((drug) => drug.status === IDrugStatus.OK && drug.qty > 0)
        .filter(({ name }) => {
          if (debouncedQuery !== '' && !name.toLowerCase().includes(debouncedQuery.trim().toLowerCase())) {
            return false;
          }
          return true;
        })
    );
  }, [debouncedQuery, drugs]);

  const {
    data: _drugs,
    changePage,
    pageSize
  } = usePagination({ defaultPaging: { page: 1, pageSize: 6 }, data: records });

  useLayoutEffect(() => {
    dispatch(DrugActions.getAllDrugs({ url: '' }));
    dispatch(PropertyActions.getAllProperties());
  }, []);

  const totalPages = useMemo(() => {
    const total = Math.ceil(records.length / pageSize);
    if (total < 1) return 1;
    return total;
  }, [records, pageSize]);

  const form = useForm<CreateOrderPayload>({
    initialValues: { drugs: [], name: '', phone: '' },
    validate: {
      name: isNotEmpty('Không được để trống'),
      phone: isNotEmpty('Không được để trống')
    }
  });

  const handleSubmitOrder = async (payload: CreateOrderPayload) => {
    setIsFetchingCreateOrder(true);
    const { response, error } = await useCallApi({ ...API_URLS.Orders.create(), payload });
    if (!error && response?.status === 200) {
      renderNotification('Đặt hàng thành công', NotiType.SUCCESS);
      form.reset();
      setOrderedDrugs([]);
      dispatch(DrugActions.getAllDrugs({ url: '' }));
    } else {
      renderNotification(error?.response?.data.devMsg, NotiType.ERROR);
    }
    setIsFetchingCreateOrder(false);
  };

  return (
    <>
      <Header height={56} mb={32}>
        <Container size="xl">
          <div className={classes.inner}>
            <Group>
              <IconPill />
              <Text fz="1rem" fw={600}>
                THUỐC VIỆT
              </Text>
            </Group>
            <Group spacing={5} className={classes.links}>
              <Text fz="md" fw={500}>
                Trang Đặt Hàng
              </Text>
            </Group>
          </div>
        </Container>
      </Header>
      <Container size="xl">
        <Grid gutter={32}>
          <Grid.Col span={8}>
            <Group position="apart">
              <Pagination onChange={changePage} total={totalPages} />
              <Group spacing="xs">
                {isSearchByImage && (
                  <Tooltip label="Huỷ lọc tìm kiếm bằng hình ảnh">
                    <ActionIcon
                      onClick={() => {
                        setIsSearchByImage(false);
                        dispatch(DrugActions.getAllDrugs({ url: '' }));
                      }}
                    >
                      <IconX size="1rem" />
                    </ActionIcon>
                  </Tooltip>
                )}
                <TextInput
                  icon={<IconSearch size="1rem" />}
                  placeholder="Tìm kiếm sản phẩm..."
                  value={query}
                  onChange={(e) => setQuery(e.currentTarget.value)}
                />
                <Tooltip label="Tìm kiếm bằng hình ảnh">
                  <ActionIcon onClick={open}>
                    <IconPhotoSearch stroke={1.75} color="black" />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
            <Grid mt={26}>
              {_drugs.length < 1 ? (
                <Text p={8} color="red">
                  Không có sản phẩm bạn yêu cầu
                </Text>
              ) : (
                _drugs.map((drug) => {
                  return (
                    <Grid.Col key={drug.id} span={4}>
                      <DrugCard orderedDrugs={orderedDrugs} setOrderedDrugs={setOrderedDrugs} item={drug} />
                    </Grid.Col>
                  );
                })
              )}
            </Grid>
          </Grid.Col>
          <Grid.Col span={4}>
            <Stack>
              <Title order={3}>Thông Tin Đơn Hàng</Title>
              <Text fz="sm" weight={500}>
                Danh sách sản phẩm
              </Text>
              <Card mt={-14} mb={-8} radius="md" h={392} withBorder>
                <ScrollArea offsetScrollbars h={320}>
                  <Grid>
                    <Grid.Col span={7}>
                      <Text truncate fw={500}>
                        Tên
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Text fw={500}>Đơn giá</Text>
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <Text fw={500}>SL</Text>
                    </Grid.Col>
                  </Grid>
                  {orderedDrugs.map((drug, index) => {
                    return <OrderedDrugCard drug={drug} key={`ordered-drug-card-${index}`} />;
                  })}
                </ScrollArea>
              </Card>
              <form
                onSubmit={form.onSubmit((values) =>
                  handleSubmitOrder({ name: values.name, phone: values.phone, drugs: orderedDrugs })
                )}
              >
                <Stack spacing={4}>
                  <TextInput
                    radius="md"
                    label="Tên người nhận"
                    withAsterisk
                    placeholder="Nhập tên người nhận..."
                    {...form.getInputProps('name')}
                  />
                  <TextInput
                    radius="md"
                    label="Số điện thoại"
                    withAsterisk
                    placeholder="Nhập số điện thoại người nhận..."
                    {...form.getInputProps('phone')}
                  />
                  <Group mt="sm" position="right">
                    <Button
                      loading={isFetchingCreateOrder}
                      rightIcon={<IconChecks size="1rem" />}
                      color="teal"
                      type="submit"
                    >
                      XÁC NHẬN ĐẶT HÀNG
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
      <Modal centered={true} withCloseButton={false} onClose={close} opened={opened}>
        <ModalDropZone setIsSearchByImage={setIsSearchByImage} close={close} />
      </Modal>
    </>
  );
};

export default Dashboard;

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    }
  },

  linkLabel: {
    marginRight: rem(5)
  }
}));
