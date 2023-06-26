import { OrderDrug } from '@/configs/api/payload';
import { IDrug } from '@/types/models/IDrug';
import { NotiType, renderNotification } from '@/utils/notifications';
import { ActionIcon, Button, Group, NumberInput, NumberInputHandlers, createStyles, rem } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useRef, useState } from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${rem(6)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,

    '&:focus-within': {
      borderColor: theme.colors[theme.primaryColor][6]
    }
  },

  control: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]}`,

    '&:disabled': {
      borderColor: theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3],
      opacity: 0.8,
      backgroundColor: 'transparent'
    }
  },

  input: {
    textAlign: 'center',
    paddingRight: `${theme.spacing.sm} !important`,
    paddingLeft: `${theme.spacing.sm} !important`,
    height: rem(28),
    flex: 1
  }
}));

interface QuantityInputProps {
  item: IDrug;
  close: () => void;
  orderedDrugs: OrderDrug[];
  setOrderedDrugs: React.Dispatch<React.SetStateAction<OrderDrug[]>>;
}

const ModalQuantity: React.FC<QuantityInputProps> = ({ item, setOrderedDrugs, close, orderedDrugs }) => {
  if (typeof item.id === 'undefined') return null;

  const existedDrug = orderedDrugs.find((_drug) => _drug.drugID === item.id);

  const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>(null);
  const [value, setValue] = useState<number | ''>(1);

  return (
    <Group px="xl" position="apart">
      <div className={classes.wrapper}>
        <ActionIcon<'button'>
          size={28}
          variant="transparent"
          onClick={() => handlers.current?.decrement()}
          disabled={value === 1}
          className={classes.control}
          onMouseDown={(event) => event.preventDefault()}
        >
          <IconMinus size="1rem" stroke={1.5} />
        </ActionIcon>

        <NumberInput
          variant="unstyled"
          min={1}
          max={existedDrug ? item.qty - existedDrug.qty : item.qty}
          handlersRef={handlers}
          value={value}
          onChange={setValue}
          classNames={{ input: classes.input }}
        />

        <ActionIcon<'button'>
          size={28}
          variant="transparent"
          onClick={() => handlers.current?.increment()}
          disabled={value === (existedDrug ? item.qty - existedDrug.qty : item.qty)}
          className={classes.control}
          onMouseDown={(event) => event.preventDefault()}
        >
          <IconPlus size="1rem" stroke={1.5} />
        </ActionIcon>
      </div>
      <Button
        onClick={() => {
          setOrderedDrugs((prev) => {
            if (typeof item.id === 'undefined') {
              return prev;
            }

            const existingDrug = prev.find((drug) => drug.drugID === item.id);

            if (existingDrug) {
              return prev.map((drug) => {
                if (drug.drugID === item.id) {
                  return {
                    ...drug,
                    price: drug.price + item.price * Number(value),
                    qty: drug.qty + Number(value)
                  };
                }
                return drug;
              });
            } else {
              return [...prev, { drugID: item.id, price: item.price * Number(value), qty: Number(value) }];
            }
          });
          close();
          renderNotification('Thêm vào giỏ thành công', NotiType.SUCCESS);
        }}
      >
        Thêm vào giỏ
      </Button>
    </Group>
  );
};

export default ModalQuantity;
