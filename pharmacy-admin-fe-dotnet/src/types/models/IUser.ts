import { BaseModel } from '.';

export interface IUser extends BaseModel {
  username: string;
  role: IUserRole;
  fullname: string;
  email: string;
  password: string;
}

export enum IUserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF'
}
