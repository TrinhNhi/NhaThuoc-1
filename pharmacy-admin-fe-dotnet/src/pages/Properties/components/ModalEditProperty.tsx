import SubmitButtonsGroup from '@/components/common/SubmitButtonsGroup';
import { CreatePropertyPayload } from '@/configs/api/payload';
import { useAppDispatch } from '@/hooks/redux';
import { PropertyActions } from '@/redux/reducers/property/property.action';
import { IDrugUnit } from '@/types/models/IDrug';
import { IProperty } from '@/types/models/IProperty';
import { NotiType, renderNotification } from '@/utils/notifications';
import { Grid, Group, NumberInput, Radio, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDidUpdate } from '@mantine/hooks';
import React, { useMemo, useState } from 'react';

interface Props {
  property?: IProperty;
  close: () => void;
}

const ModalEditProperty: React.FC<Props> = ({ close, property }) => {
  if (!property) return null;
  const dispatch = useAppDispatch();

  const _unit = useMemo(() => {
    if (property.bottlesPerBin === 0) return IDrugUnit.PILL;
    return IDrugUnit.BOTTLE;
  }, [property]);

  const [unit, setUnit] = useState<IDrugUnit>(_unit);

  const form = useForm<CreatePropertyPayload>({
    initialValues: property
  });

  useDidUpdate(() => {
    if (unit === IDrugUnit.PILL) {
      form.setFieldValue('bottlesPerBin', 0);
      return;
    }
    form.setFieldValue('boxesPerBin', 0);
    form.setFieldValue('packsPerBox', 0);
    form.setFieldValue('pillsPerPack', 0);
  }, [unit]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        if (!form.isDirty()) {
          renderNotification('Bạn chưa thay đổi thông tin gì!', NotiType.ERROR);
          return;
        }
        dispatch(
          PropertyActions.updateProperty(values, property.id ?? -1, {
            onSuccess: () => {
              close();
              dispatch(PropertyActions.getAllProperties());
            }
          })
        );
      })}
    >
      <Stack>
        <Radio.Group defaultValue={_unit} onChange={(value) => setUnit(value as IDrugUnit)} name="unit" label="Đơn vị" withAsterisk>
          <Group mt="xs">
            <Radio value={IDrugUnit.PILL} label="Viên" />
            <Radio value={IDrugUnit.BOTTLE} label="Chai" />
          </Group>
        </Radio.Group>
        {unit === IDrugUnit.PILL && (
          <Grid>
            <Grid.Col span={4}>
              <NumberInput defaultValue={1} label="Số hộp/Thùng" withAsterisk {...form.getInputProps('boxesPerBin')} />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput defaultValue={1} label="Số vỉ/Hộp" withAsterisk {...form.getInputProps('packsPerBox')} />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput defaultValue={1} label="Số viên/vỉ" withAsterisk {...form.getInputProps('pillsPerPack')} />
            </Grid.Col>
          </Grid>
        )}
        {unit === IDrugUnit.BOTTLE && <NumberInput defaultValue={1} label="Số chai/Thùng" withAsterisk {...form.getInputProps('bottlesPerBin')} />}
        <SubmitButtonsGroup submitText="Sửa" onCancel={close} />
      </Stack>
    </form>
  );
};

export default ModalEditProperty;
