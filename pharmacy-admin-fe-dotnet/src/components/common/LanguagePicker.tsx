import { langs } from '@/locales/i18n';
import { Avatar, Box, BoxProps, Group, Select, Text } from '@mantine/core';
import React, { forwardRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguagePickerProps {
  sx?: BoxProps['sx'];
}
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({ sx }) => {
  const { t } = useTranslation();

  const LangSelectData = useMemo(
    () =>
      langs.map((lang) => ({
        label: t(`lang.${lang}`),
        value: lang
      })),
    [t]
  );

  return (
    <Box sx={sx}>
      <Select
        size="xs"
        w={70}
        label={t('lang.choose')}
        defaultValue={localStorage.getItem('lang')}
        data={LangSelectData}
        onChange={(value) => {
          localStorage.setItem('lang', value ?? 'vi');
          window.location.reload();
        }}
      />
    </Box>
  );
};

export default LanguagePicker;
