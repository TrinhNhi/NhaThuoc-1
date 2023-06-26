import { CreateSupplierPayload } from '@/configs/api/payload';
import { useAppDispatch } from '@/hooks/redux';
import { SupplierAction } from '@/redux/reducers/supplier/supplier.actions';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

interface Props {
  close: () => void;
}

const ModalCreateSupplier: React.FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();
  const initialValues: CreateSupplierPayload = {
    name: '',
    address: '',
    phone: ''
  };

  const form = useForm({
    initialValues,
    validate: {
      name: isNotEmpty('Bạn cần nhập tên của nhà phân phối'),
      address: isNotEmpty('Bạn cần nhập địa chỉ của nhà phân phối'),
      phone: isNotEmpty('Bạn cần nhập số điện thoại của nhà phân phối')
    }
  });

  return (
    <form
      id="form-create-supplier"
      onSubmit={form.onSubmit((values) =>
        dispatch(
          SupplierAction.createSupplier(values, {
            onSuccess: () => {
              close();
              dispatch(SupplierAction.getAllSupplier());
            }
          })
        )
      )}
    >
      <Stack>
        <TextInput withAsterisk label="Tên nhà phân phối" placeholder="Nhập tên nhà phân phối" {...form.getInputProps('name')} />
        <TextInput withAsterisk label="Địa chỉ " placeholder="Nhập địa chỉ" {...form.getInputProps('address')} />
        <TextInput withAsterisk label="Số điện thoại" placeholder="Nhập số điện thoại" {...form.getInputProps('phone')} />
        <Group position="right">
          <Button variant="light" onClick={close}>
            Huỷ bỏ
          </Button>
          <Button type="submit"> Thêm mới</Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ModalCreateSupplier;
