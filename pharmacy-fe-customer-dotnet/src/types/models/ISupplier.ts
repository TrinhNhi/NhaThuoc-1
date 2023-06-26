import { BaseModel } from '.';
import { SelectItem } from '@mantine/core';
export interface ISupplier extends BaseModel {
  name: string;
  address: string;
  phone: string;
  status: ISupplierStatus;
}

export enum ISupplierStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export const SelectSupplierOptions = (suppliers: ISupplier[]): SelectItem[] => {
  return suppliers.map((supplier) => ({
    value: supplier.id?.toString() ?? '',
    label: supplier.name ?? ''
  }));
};

export const SupplierStatusDict: Record<ISupplierStatus, { label: string; color: string }> = {
  [ISupplierStatus.ACTIVE]: {
    label: 'Đang hoạt động',
    color: 'blue'
  },
  [ISupplierStatus.INACTIVE]: {
    label: 'Đã dừng hoạt động',
    color: 'orange'
  }
};
