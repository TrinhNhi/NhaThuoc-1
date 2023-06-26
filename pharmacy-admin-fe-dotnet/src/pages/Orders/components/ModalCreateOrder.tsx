import { CreateOrderPayload, OrderDrug } from '@/configs/api/payload';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/reducers';
import { Button, Group, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconChecks } from '@tabler/icons-react';
import { useEffect, useLayoutEffect, useState } from 'react';
import CardDrug from './CardDrug';
import { OrderAction } from '@/redux/reducers/order/order.action';
import { DrugActions } from '@/redux/reducers/drug/drug.action';
import { useDebouncedValue } from '@mantine/hooks';
import { IDrugStatus } from '@/types/models/IDrug';

interface Props {
  close: () => void;
}
export const ModalCreateOrder = ({ close }: Props) => {
  const dispatch = useAppDispatch();
  const form = useForm<CreateOrderPayload>({
    initialValues: { drugs: [], name: '', phone: '' },
    validate: {
      name: isNotEmpty('Không được để trống'),
      phone: isNotEmpty('Không được để trống')
    },
    transformValues: (values) => ({ ...values, drugs: _orderedDrugs })
  });
  useLayoutEffect(() => {
    dispatch(DrugActions.getAllDrugs({ url: '' }));
  }, [dispatch]);

  const { drugs } = useAppSelector((state: RootState) => state.drug);
  const [_records, setRecords] = useState(drugs);
  const [_orderedDrugs, setOrderedDrugs] = useState<OrderDrug[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setRecords(
      drugs
        .filter((drug) => drug.status === IDrugStatus.OK && drug.qty > 0 && drug.isPrescription === false)
        .filter(({ name }) => {
          if (debouncedQuery !== '' && !name.toLowerCase().includes(debouncedQuery.trim().toLowerCase())) {
            return false;
          }
          return true;
        })
    );
  }, [debouncedQuery, drugs]);
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        dispatch(
          OrderAction.createOrder(values, {
            onSuccess: () => {
              dispatch(OrderAction.getAllOrder());
              close();
            }
          })
        );
      })}
    >
      <Stack spacing={4}>
        <TextInput radius="md" label="Tên khách hàng" withAsterisk placeholder="Nhập tên khách hàng..." {...form.getInputProps('name')} />
        <TextInput radius="md" label="Số điện thoại" withAsterisk placeholder="Nhập số điện thoại khác hàng..." {...form.getInputProps('phone')} />

        <TextInput
          radius="md"
          label="Chọn sản phẩm"
          placeholder="Nhập tên của sản phẩm"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <ScrollArea h={350}>
          {_records.length > 0 ? (
            _records.map((drug) => <CardDrug key={drug.id} drug={drug} orderedDrugs={_orderedDrugs} setOrderedDrugs={setOrderedDrugs} />)
          ) : (
            <Text align="center" mt={'md'} fw={600}>
              Không tìm thấy sản phẩm tương ứng
            </Text>
          )}
        </ScrollArea>
        <Group mt="sm" position="right">
          <Button rightIcon={<IconChecks size="1rem" />} type="submit">
            Tạo đơn hàng
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
