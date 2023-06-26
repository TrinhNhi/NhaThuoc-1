import { BaseModel } from '.';
import { IProperty } from './IProperty';
import { ISupplier } from './ISupplier';

export interface IDrug extends BaseModel {
  name: string;
  qty: number;
  price: number;
  condition: number;
  status: IDrugStatus;
  image: string;
  supplier: ISupplier;
  property: IProperty;
  isPrescription: boolean;
}

export enum IDrugStatus {
  OK = 'OK',
  MAINTAINING = 'MAINTAINING'
}

export const DrugStatusDict: Record<IDrugStatus, { label: string; color: string }> = {
  [IDrugStatus.OK]: {
    label: 'Hoạt động',
    color: 'green'
  },
  [IDrugStatus.MAINTAINING]: {
    label: 'Không còn bán',
    color: 'red'
  }
};

export enum IDrugUnit {
  BOTTLE = 'BOTTLE',
  PILL = 'PILL',
  BLISTER_PACK = 'BLISTER_PACK',
  BOX = 'BOX',
  BIN = 'BIN'
}

export const DrugUnitDict: Record<IDrugUnit, { label: string }> = {
  [IDrugUnit.BOTTLE]: {
    label: 'Chai/Lọ'
  },
  [IDrugUnit.PILL]: {
    label: 'Viên'
  },
  [IDrugUnit.BIN]: {
    label: 'Thùng'
  },
  [IDrugUnit.BLISTER_PACK]: {
    label: 'Vỉ'
  },
  [IDrugUnit.BOX]: {
    label: 'Hộp'
  }
};
