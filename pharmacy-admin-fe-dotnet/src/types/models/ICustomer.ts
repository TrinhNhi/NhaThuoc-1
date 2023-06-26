import { BaseModel } from '.';

export interface ICustomer extends BaseModel {
  name: string;
  phone: string;
}
