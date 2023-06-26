import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useUploadFirebase } from '@/hooks/use-upload-firebase';
import { DrugActions } from '@/redux/reducers/drug/drug.action';
import { Button, Group, Image, Loader, ScrollArea, Stack, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  close: () => void;
  setIsSearchByImage: Dispatch<SetStateAction<boolean>>;
}

const ModalDropZone: React.FC<Props> = ({ close, setIsSearchByImage }) => {
  const dispatch = useAppDispatch();

  const { isFetching } = useAppSelector((state) => state.drug);

  const [isLoading, url, handleUploadImageOnFirebase] = useUploadFirebase();

  return (
    <Stack spacing={'xs'}>
      <Dropzone
        onDrop={(files) => {
          handleUploadImageOnFirebase(files[0], {
            onSuccess: (downloadUrl) => {
              console.log('Image uploaded:', downloadUrl);
            }
          });
        }}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple={false}
      >
        <Group position="center" spacing="xs" style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload size="2rem" stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size="2rem" stroke={1.5} />
          </Dropzone.Reject>

          {url && !isLoading ? (
            <ScrollArea h={300} w={300}>
              <Image src={url} />
            </ScrollArea>
          ) : isLoading ? (
            <Loader />
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
      {url && (
        <Button
          loading={isLoading || isFetching}
          onClick={() => {
            if (!url) return;
            dispatch(
              DrugActions.getAllDrugs(
                { url },
                {
                  onSuccess: () => {
                    close();
                    setIsSearchByImage(true);
                  }
                }
              )
            );
          }}
        >
          Tìm kiếm
        </Button>
      )}
    </Stack>
  );
};

export default ModalDropZone;
