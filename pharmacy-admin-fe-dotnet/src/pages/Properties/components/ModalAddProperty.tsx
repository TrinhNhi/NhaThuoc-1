import SubmitButtonsGroup from '@/components/common/SubmitButtonsGroup';
import { CreatePropertyPayload } from '@/configs/api/payload';
import { useAppDispatch } from '@/hooks/redux';
import { PropertyActions } from '@/redux/reducers/property/property.action';
import { IDrugUnit } from '@/types/models/IDrug';
import { Grid, Group, NumberInput, Radio, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDidUpdate } from '@mantine/hooks';
import React, { useState } from 'react';

interface Props {
  close: () => void;
}

const ModalAddProperty: React.FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();

  const [unit, setUnit] = useState<IDrugUnit>();

  const form = useForm<CreatePropertyPayload>({
    initialValues: { bottlesPerBin: 0, boxesPerBin: 0, packsPerBox: 0, pillsPerPack: 0 }
  });

  useDidUpdate(() => {
    form.reset();
  }, [unit]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        dispatch(
          PropertyActions.createProperty(values, {
            onSuccess: () => {
              close();
              dispatch(PropertyActions.getAllProperties());
            }
          })
        );
      })}
    >
      <Stack>
        <Radio.Group onChange={(value) => setUnit(value as IDrugUnit)} name="unit" label="Đơn vị" withAsterisk>
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
        <SubmitButtonsGroup onCancel={close} />
      </Stack>
    </form>
  );
};

export default ModalAddProperty;
