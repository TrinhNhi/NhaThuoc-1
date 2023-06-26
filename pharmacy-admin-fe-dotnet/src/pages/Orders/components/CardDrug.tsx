import { ActionIcon, Card, Grid, Group, Image, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IDrug } from '@/types/models/IDrug';
import { OrderDrug } from '@/configs/api/payload';
import { formatCurrency } from '@/utils/helpers';

interface Props {
  drug: IDrug;
  orderedDrugs: OrderDrug[];
  setOrderedDrugs: Dispatch<SetStateAction<OrderDrug[]>>;
}

const CardDrug = ({ drug, orderedDrugs, setOrderedDrugs }: Props) => {
  const [_quantity, setQuantity] = useState(0);

  useEffect(() => {
    const index = orderedDrugs.findIndex((item) => item.drugID === drug.id);

    if (_quantity > 0) {
      if (index !== -1) {
        if (drug.price) {
          const UpdateOrderedDrugs = [...orderedDrugs];
          UpdateOrderedDrugs[index].qty = _quantity;
          UpdateOrderedDrugs[index].price = _quantity * drug.price;
          setOrderedDrugs(UpdateOrderedDrugs);
        }
      } else {
        if (drug.id && drug.price) {
          setOrderedDrugs([...orderedDrugs, { drugID: drug.id, qty: _quantity, price: _quantity * drug.price }]);
        }
      }
    } else if (index !== -1) {
      const UpdateOrderedDrugs = [...orderedDrugs];
      UpdateOrderedDrugs.splice(index, 1);
      setOrderedDrugs(UpdateOrderedDrugs);
    }
  }, [_quantity, drug.id, setOrderedDrugs]);

  return (
    <Card shadow="xs">
      <Grid align="center">
        <Grid.Col span={7}>
          <Group spacing="xl">
            <Image width={56} height={56} src={drug.image} withPlaceholder />
            <Text lineClamp={1}>{drug.name}</Text>
          </Group>
        </Grid.Col>

        <Grid.Col span={2}>{drug.price ? <Text lineClamp={1}>{formatCurrency(drug.price * _quantity)} </Text> : null}</Grid.Col>
        <Grid.Col span={3}>
          <Group grow>
            <ActionIcon disabled={_quantity <= 0} onClick={() => setQuantity((prev) => prev - 1)}>
              <IconMinus />
            </ActionIcon>
            <Text align="center">{_quantity}</Text>
            <ActionIcon onClick={() => setQuantity((prev) => prev + 1)} disabled={_quantity == drug.qty}>
              <IconPlus />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default CardDrug;
