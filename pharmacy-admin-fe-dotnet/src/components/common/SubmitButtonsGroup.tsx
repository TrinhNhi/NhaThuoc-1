import { Button, Group } from '@mantine/core';
import React from 'react';

interface SubmitButtonGroupProps {
  onCancel: () => void;
  cancelText?: string;
  submitText?: string;
  loading?: boolean;
}

const SubmitButtonsGroup: React.FC<SubmitButtonGroupProps> = ({ loading, onCancel, cancelText = 'Huỷ bỏ', submitText = 'Thêm mới' }) => {
  return (
    <Group mt="sm" position="right">
      <Button variant="light" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button loading={loading} type="submit">
        {submitText}
      </Button>
    </Group>
  );
};

export default SubmitButtonsGroup;
