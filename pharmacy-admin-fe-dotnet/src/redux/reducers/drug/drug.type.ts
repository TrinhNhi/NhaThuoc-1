import { IDrug } from '@/types/models/IDrug';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export interface DrugState {
  isFetching: boolean;
  drugs: IDrug[];
}

export enum DrugActionType {
  DRUG_ACTION_PENDING = 'DRUG_ACTION_PENDING',
  DRUG_ACTION_FAILURE = 'DRUG_ACTION_FAILURE',

  CREATE_DRUG_SUCCESS = 'CREATE_DRUG_SUCCESS',
  GET_ALL_DRUGS_SUCCESS = 'GET_ALL_DRUGS_SUCCESS',
  UPDATE_DRUG_SUCCESS = 'UPDATE_DRUG_SUCCESS',
  CHANGE_DRUG_STATUS_SUCCESS = 'CHANGE_DRUG_STATUS_SUCCESS'
}

export interface DrugActionPending {
  type: DrugActionType.DRUG_ACTION_PENDING;
}

export interface DrugActionFailure {
  type: DrugActionType.DRUG_ACTION_FAILURE;
}

export interface CreateDrugSuccess {
  type: DrugActionType.CREATE_DRUG_SUCCESS;
}

export interface GetAllDrugsSuccess {
  type: DrugActionType.GET_ALL_DRUGS_SUCCESS;
  payload: IDrug[];
}

export interface UpdateDrugSuccess {
  type: DrugActionType.UPDATE_DRUG_SUCCESS;
}

export interface ChangeDrugStatusSuccess {
  type: DrugActionType.CHANGE_DRUG_STATUS_SUCCESS;
}

export type DrugAction = DrugActionFailure | DrugActionPending | CreateDrugSuccess | UpdateDrugSuccess | ChangeDrugStatusSuccess | GetAllDrugsSuccess;

export type DrugThunkAction = ThunkAction<void, RootState, any, DrugAction>;
