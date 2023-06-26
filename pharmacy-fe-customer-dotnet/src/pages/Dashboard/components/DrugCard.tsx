import { OrderDrug } from '@/configs/api/payload';
import { IDrug, IDrugStatus } from '@/types/models/IDrug';
import { formatCurrency } from '@/utils/helpers';
import { Badge, Button, Card, Group, Image, Modal, Stack, Text, createStyles, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  Icon123,
  IconBottle,
  IconPill,
  IconSettings,
  IconShoppingCart,
  IconShoppingCartOff
} from '@tabler/icons-react';
import ModalQuantity from './ModalQuantity';

interface Props {
  item: IDrug;
  orderedDrugs: OrderDrug[];
  setOrderedDrugs: React.Dispatch<React.SetStateAction<OrderDrug[]>>;
}

const DrugCard: React.FC<Props> = ({ item, setOrderedDrugs, orderedDrugs }) => {
  const { classes } = useStyles();

  const existedDrug = orderedDrugs.find((_drug) => _drug.drugID === item.id);

  const [openedQty, { close: closeQty, open: openQty }] = useDisclosure();

  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image src={item.image} alt="Tesla Model S" height={150} width={150} />
        </Card.Section>

        <Group position="apart" mt="md">
          <Text fw={500}>{item.name}</Text>
        </Group>

        <Card.Section className={classes.section} mt="md">
          <Stack spacing={8}>
            <Group>
              <Icon123 size="1.05rem" className={classes.icon} stroke={1.5} />
              <Text size="xs">Trong kho: {item.qty}</Text>
            </Group>
            {item.property.bottlesPerBin > 0 ? (
              <Group>
                <IconBottle size="1.05rem" className={classes.icon} stroke={1.5} />
                <Text size="xs">{item.property.bottlesPerBin} chai/thùng</Text>
              </Group>
            ) : (
              <Group>
                <IconPill size="1.05rem" className={classes.icon} stroke={1.5} />
                <Text size="xs">
                  {item.property.boxesPerBin} hộp/thùng - {item.property.packsPerBox} vỉ/hộp -{' '}
                  {item.property.pillsPerPack}
                  viên/vỉ{' '}
                </Text>
              </Group>
            )}
          </Stack>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Group spacing={30} position="apart">
            <div>
              <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                {formatCurrency(item.price)}
              </Text>
              <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
                VND
              </Text>
            </div>

            {item.isPrescription ? (
              <Button disabled radius="xl">
                Thuốc kê đơn
              </Button>
            ) : (
              <Button
                leftIcon={
                  item.status === IDrugStatus.MAINTAINING ? (
                    <IconSettings size="1rem" />
                  ) : item.qty < 1 ? (
                    <IconShoppingCartOff size="1rem" />
                  ) : (
                    <IconShoppingCart size="1rem" />
                  )
                }
                disabled={
                  item.status === IDrugStatus.MAINTAINING ||
                  item.qty < 1 ||
                  (existedDrug && existedDrug.qty === item.qty)
                }
                onClick={openQty}
                radius="xl"
              >
                {item.status === IDrugStatus.MAINTAINING ? 'Không bán' : item.qty < 1 ? 'Hết hàng' : 'Đặt hàng'}
              </Button>
            )}
          </Group>
        </Card.Section>
      </Card>
      <Modal size="sm" centered={true} title={`Nhập số lượng - ${item.name}`} onClose={closeQty} opened={openedQty}>
        <ModalQuantity orderedDrugs={orderedDrugs} setOrderedDrugs={setOrderedDrugs} close={closeQty} item={item} />
      </Modal>
    </>
  );
};

export default DrugCard;

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    position: 'relative'
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: 'uppercase'
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`
  },

  icon: {
    marginRight: rem(5),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5]
  }
}));
