import { Button, Group, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useAppDispatch } from '@/hooks/redux';
import { SupplierAction } from '@/redux/reducers/supplier/supplier.actions';
import { CreateSupplierPayload } from '@/configs/api/payload';
import { ISupplier } from '@/types/models/ISupplier';
import { NotiType, renderNotification } from '@/utils/notifications';

interface Props {
  supplier: ISupplier | null;
  close: () => void;
}

const ModalUpdateSupplier: React.FC<Props> = ({ supplier, close }) => {
  const dispatch = useAppDispatch();

  const initialValues: CreateSupplierPayload = {
    name: supplier?.name || '',
    address: supplier?.address || '',
    phone: supplier?.phone || ''
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
      id="form-update-supplier"
      onSubmit={form.onSubmit((values) => {
        if (!form.isDirty()) {
          renderNotification('Bạn chưa thay đổi thông tin gì!', NotiType.ERROR);
          return;
        }
        dispatch(
          SupplierAction.updateSupplier(
            values,
            {
              onSuccess: () => {
                dispatch(SupplierAction.getAllSupplier());
                close();
              }
            },
            supplier?.id
          )
        );
      })}
    >
      <Stack>
        <TextInput withAsterisk label="Tên nhà phân phối" placeholder="Nhập tên nhà phân phối" {...form.getInputProps('name')} />
        <TextInput withAsterisk label="Địa chỉ " placeholder="Nhập địa chỉ" {...form.getInputProps('address')} />
        <TextInput withAsterisk label="Số điện thoại" placeholder="Nhập số điện thoại" {...form.getInputProps('phone')} />
        <Group position="right">
          <Button variant="light" onClick={close}>
            Huỷ bỏ
          </Button>
          <Button type="submit">Cập nhật </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ModalUpdateSupplier;
