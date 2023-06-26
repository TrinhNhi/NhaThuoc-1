import { SelectItem } from '@mantine/core';
import { BaseModel } from '.';

export interface IProperty extends BaseModel {
  boxesPerBin: number;
  bottlesPerBin: number;
  packsPerBox: number;
  pillsPerPack: number;
}

export const SelectPropertyOptions = (properties: IProperty[]): SelectItem[] => {
  return properties.map((property) => ({
    value: property.id?.toString() ?? '',
    label:
      property.bottlesPerBin === 0
        ? `${property.boxesPerBin} hộp/1 thùng, ${property.packsPerBox} vỉ/1 hộp, ${property.pillsPerPack} viên/1 vỉ`
        : `${property.bottlesPerBin} chai/1 thùng`
  }));
};
