import { OrderDrug } from '@/configs/api/payload';
import { useAppSelector } from '@/hooks/redux';
import { formatCurrency } from '@/utils/helpers';
import { Grid, Text } from '@mantine/core';
import React from 'react';

interface Props {
  drug: OrderDrug;
}

const OrderedDrugCard: React.FC<Props> = ({ drug }) => {
  const { drugs } = useAppSelector((state) => state.drug);

  const _drug = drugs.find((reduxDrug) => reduxDrug.id === drug.drugID);

  if (!_drug) return null;

  return (
    <Grid>
      <Grid.Col span={7}>
        <Text truncate>{_drug.name}</Text>
      </Grid.Col>
      <Grid.Col span={4}>
        <Text>{formatCurrency(drug.price)} đ</Text>
      </Grid.Col>
      <Grid.Col span={1}>
        <Text>{drug.qty}</Text>
      </Grid.Col>
    </Grid>
  );
};

export default OrderedDrugCard;
