import { IDrug } from './IDrug';

export interface IStatistic {
  drug: IStatisticProp;
  supplier: IStatisticProp;
  totalOrder: number;
  totalPack: number;
  drugOrder: IDrug[];
}

export interface IStatisticProp {
  status: string;
  total: number;
}
