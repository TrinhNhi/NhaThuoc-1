import { IProperty } from '@/types/models/IProperty';
import { IUserRole } from '@/types/models/IUser';

export type SignUpPayload = {
  username: string;
  password: string;
  fullName: string;
  role: IUserRole;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type EditProfilePayload = {
  fullName: string;
  salary: number;
  image: string;
};

export type SearchPayload = {
  url: string;
};

export type CreateDrugPayload = {
  name: string;
  qty: number;
  price: number;
  condition: number;
  image: string;
  propertyID: number | undefined;
  supplierID: number | undefined;
};

export type UpdateDrugPayload = CreateDrugPayload;

export type CreatePropertyPayload = IProperty;

export type UpdatePropertyPayload = IProperty;

export type CreateSupplierPayload = {
  name: string;
  address: string;
  phone: string;
};

export type UpdateSupplierPayload = CreateSupplierPayload;

export type CreateOrderPayload = {
  name: string;
  phone: string;
  drugs: OrderDrug[];
};

export type OrderDrug = {
  drugID: number;
  qty: number;
  price: number;
};

export type CreateUnitPayload = {
  name: string;
  parentID: number;
};

export type UpdateUnitPayload = CreateUnitPayload;

export type ApiEndPointPayload =
  | SignUpPayload
  | LoginPayload
  | EditProfilePayload
  | SearchPayload
  | CreateDrugPayload
  | UpdateDrugPayload
  | UpdatePropertyPayload
  | CreateSupplierPayload
  | UpdateSupplierPayload
  | CreateUnitPayload
  | UpdateUnitPayload
  | CreateOrderPayload;
