import { CreateDrugPayload } from '@/configs/api/payload';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useUploadFirebase } from '@/hooks/use-upload-firebase';
import { DrugActions } from '@/redux/reducers/drug/drug.action';
import { PropertyActions } from '@/redux/reducers/property/property.action';
import { SelectPropertyOptions } from '@/types/models/IProperty';
import { SelectSupplierOptions } from '@/types/models/ISupplier';
import { Button, Checkbox, Flex, Grid, Group, Image, NumberInput, ScrollArea, Select, Stack, Text, TextInput, useMantineTheme } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

interface Props {
  close: () => void;
}

const ModalAddDrug: React.FC<Props> = ({ close }) => {
  const theme = useMantineTheme();

  const dispatch = useAppDispatch();

  const [previewImage, setPreviewImage] = useState<FileWithPath>();

  const { suppliers, properties } = useAppSelector((state) => ({
    suppliers: state.supplier.suppliers,
    properties: state.property.properties
  }));

  const [isLoadingUpload, url, handleUploadImageOnFirebase] = useUploadFirebase();

  const form = useForm<CreateDrugPayload>({
    initialValues: {
      image: '',
      name: '',
      price: 0,
      qty: 0,
      propertyID: undefined,
      supplierID: undefined,
      exp: undefined,
      isPrescription: false
    },

    validate: {
      name: isNotEmpty('Không được để trống'),
      qty: isNotEmpty('Không được để trống'),
      supplierID: isNotEmpty('Không được để trống'),
      propertyID: isNotEmpty('Không được để trống'),
      price: isNotEmpty('Không được để trống'),
      exp: isNotEmpty('Không được để trống')
    },

    transformValues: (values) => ({
      ...values,
      propertyID: Number(values.propertyID),
      supplierID: Number(values.supplierID),
      exp: dayjs(values.exp).toISOString()
    })
  });

  useEffect(() => {
    dispatch(PropertyActions.getAllProperties());
  }, []);

  useEffect(() => {
    const foundProp = properties.find((prop) => prop.id === Number(form.values.propertyID));
    if (!foundProp) return;
    const { bottlesPerBin, boxesPerBin, packsPerBox, pillsPerPack } = foundProp;
    let _qty = 1;
    if (bottlesPerBin > 0) _qty *= bottlesPerBin;
    if (boxesPerBin > 0) _qty *= boxesPerBin;
    if (packsPerBox > 0) _qty *= packsPerBox;
    if (pillsPerPack > 0) _qty *= pillsPerPack;
    form.setFieldValue('qty', _qty);
  }, [form.values.propertyID]);

  return (
    <form
      id="form-add-category"
      onSubmit={form.onSubmit((values) => {
        dispatch(
          DrugActions.createDrug(
            { ...values, condition: 100 },
            {
              onSuccess: () => {
                close();
                dispatch(DrugActions.getAllDrugs({ url: '' }));
              }
            }
          )
        );
      })}
    >
      <Flex direction="column" gap="sm">
        <TextInput withAsterisk label="Tên thuốc" placeholder="Nhập tên thuốc" {...form.getInputProps('name')} />
        <Grid>
          <Grid.Col span={12}>
            <NumberInput
              defaultValue={0}
              placeholder="Chọn hoặc nhập giá thuốc"
              label="Giá tiền"
              step={1000}
              withAsterisk
              {...form.getInputProps('price')}
              min={0}
            />
          </Grid.Col>
        </Grid>
        <DatePickerInput placeholder="Chọn ngày hết hạn" label="Ngày hết hạn" {...form.getInputProps('exp')} />
        <Select
          withAsterisk
          label="Chọn công thức"
          searchable
          data={SelectPropertyOptions(properties)}
          placeholder="Công thức"
          {...form.getInputProps(`propertyID`)}
        />
        <Select
          withAsterisk
          label="Chọn nhà cung cấp"
          searchable
          data={SelectSupplierOptions(suppliers)}
          placeholder="Nhà cung cấp"
          {...form.getInputProps(`supplierID`)}
        />
        <Checkbox
          // checked={form.getInputProps('isPrescription')}
          label={<Text fw={600}>Là thuốc kê đơn</Text>}
          labelPosition="left"
          {...form.getInputProps('isPrescription')}
        />
        <Stack spacing={0}>
          <Text fw={600} fz="sm">
            Hình ảnh
          </Text>
          <Dropzone
            onDrop={(files) => {
              setPreviewImage(files[0]);
              handleUploadImageOnFirebase(files[0], {
                onSuccess: (downloadUrl) => {
                  form.setFieldValue('image', downloadUrl);
                }
              });
            }}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
            {...form.getInputProps(`image`)}
          >
            <Group position="center" spacing="xs" style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload size="2rem" stroke={1.5} color={theme.colors[theme.primaryColor][6]} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size="2rem" stroke={1.5} color={theme.colors.red[6]} />
              </Dropzone.Reject>

              {previewImage ? (
                <ScrollArea h={300} w={300}>
                  <Image
                    src={URL.createObjectURL(previewImage)}
                    imageProps={{ onLoad: () => URL.revokeObjectURL(URL.createObjectURL(previewImage)) }}
                  />
                </ScrollArea>
              ) : (
                <>
                  <Dropzone.Idle>
                    <IconPhoto size="3.2rem" stroke={1.5} />
                  </Dropzone.Idle>
                  <Stack spacing={0} align="center">
                    <Text size="sm" inline>
                      Kéo thả hoặc nhấn để chọn file ảnh
                    </Text>
                    <Text size="xs" color="dimmed" inline mt={7}>
                      Chọn 1 ảnh duy nhất, kích cỡ không quá 5MB
                    </Text>
                  </Stack>
                </>
              )}
            </Group>
          </Dropzone>
        </Stack>

        <Group mt="sm" position="right">
          <Button variant="light" onClick={close}>
            Huỷ bỏ
          </Button>
          <Button loading={isLoadingUpload} type="submit">
            Thêm mới
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default ModalAddDrug;
