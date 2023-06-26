import { BaseModel } from '.';
import { ICustomer } from './ICustomer';
import { IDrug } from './IDrug';

export interface IOrder extends BaseModel {
  amount: number;
  customer: ICustomer;
  drugs: IDrug[];
  packer?: string;
  isPack: boolean;
}
