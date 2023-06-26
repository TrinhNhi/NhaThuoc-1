import { ThunkAction } from 'redux-thunk';
import { ISupplier } from '@/types/models/ISupplier';
import { RootState } from '..';

export interface SupplierState {
  isFetching: boolean;
  suppliers: ISupplier[];
}

export enum SupplierActionType {
  SUPPLIER_ACTION_PENDING = 'SUPPLIER_ACTION_PENDING',
  SUPPLIER_ACTION_FAILURE = 'SUPPLIER_ACTION_FAILURE',
  GET_ALL_SUPPLIER_SUCCESS = 'GET_ALL_SUPPLIER_SUCCESS',
  CREATE_SUPPLIER_SUCCESS = 'CREATE_SUPPLIER_SUCCESS',
  UPDATE_SUPPLIER_SUCCESS = 'UPDATE_SUPPLIER_SUCCESS',
  CHANGE_STATUS_SUPPLIER_SUCCESS = 'CHANGE_STATUS_SUPPLIER_SUCCESS'
}

export interface SupplierActionPending {
  type: SupplierActionType.SUPPLIER_ACTION_PENDING;
}

export interface SupplierActionFailure {
  type: SupplierActionType.SUPPLIER_ACTION_FAILURE;
}

export interface GetAllSupplierActionSuccess {
  type: SupplierActionType.GET_ALL_SUPPLIER_SUCCESS;
  payload: ISupplier[];
}

export interface CreateSupplierActionSuccess {
  type: SupplierActionType.UPDATE_SUPPLIER_SUCCESS;
}

export interface UpdateSupplierActionSuccess {
  type: SupplierActionType.CREATE_SUPPLIER_SUCCESS;
}

export interface ChangeStatusSupplierActionSuccess {
  type: SupplierActionType.CHANGE_STATUS_SUPPLIER_SUCCESS;
}

export type SupplierAction =
  | SupplierActionPending
  | SupplierActionFailure
  | GetAllSupplierActionSuccess
  | CreateSupplierActionSuccess
  | UpdateSupplierActionSuccess
  | ChangeStatusSupplierActionSuccess;

export type SupplierThunkAction = ThunkAction<void, RootState, any, SupplierAction>;
