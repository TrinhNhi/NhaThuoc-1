import { Button, ButtonProps as MantineButtonProps } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

interface ButtonProps extends MantineButtonProps {
  onClick: () => void;
}

const PlusButton: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { onClick, ...others } = props;

  return (
    <Button onClick={onClick} ref={ref} {...others} leftIcon={<IconPlus size={16} />}>
      Thêm
    </Button>
  );
});

export default PlusButton;
