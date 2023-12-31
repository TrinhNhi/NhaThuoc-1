import _ from 'lodash';

export const randomArray = (number: number): number[] => Array.from({ length: number }, (_, i) => i + 1);

export const formatCurrency = (number: number | undefined) => {
  if (!number) return '0';
  const formattedNumber = _.replace(_.round(number, 0).toString(), /\B(?=(\d{3})+(?!\d))/g, '.');
  return formattedNumber;
};

export const formatDateFromISOString = (string: string | undefined) => {
  if (!string) return '';
  return string.split('T')[0];
};

export const formatPhonenumber = (phone: string | undefined) => {
  if (!phone) return '';
  return _.replace(phone, /(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
};
