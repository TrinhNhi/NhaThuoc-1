import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { IProperty } from '@/types/models/IProperty';

export interface PropertyState {
  isFetching: boolean;
  properties: IProperty[];
}

export enum PropertyActionType {
  PROPERTY_ACTION_PENDING = 'PROPERTY_ACTION_PENDING',
  PROPERTY_ACTION_FAILURE = 'PROPERTY_ACTION_FAILURE',

  CREATE_PROPERTY_SUCCESS = 'CREATE_PROPERTY_SUCCESS',
  GET_ALL_PROPERTIES_SUCCESS = 'GET_ALL_PROPERTIES_SUCCESS',
  UPDATE_PROPERTY_SUCCESS = 'UPDATE_PROPERTY_SUCCESS'
}

export interface PropertyActionPending {
  type: PropertyActionType.PROPERTY_ACTION_PENDING;
}

export interface PropertyActionFailure {
  type: PropertyActionType.PROPERTY_ACTION_FAILURE;
}

export interface CreatePropertySuccess {
  type: PropertyActionType.CREATE_PROPERTY_SUCCESS;
}

export interface GetAllPropertiesSuccess {
  type: PropertyActionType.GET_ALL_PROPERTIES_SUCCESS;
  payload: IProperty[];
}

export interface UpdatePropertySuccess {
  type: PropertyActionType.UPDATE_PROPERTY_SUCCESS;
}

export type PropertyAction = PropertyActionFailure | PropertyActionPending | CreatePropertySuccess | UpdatePropertySuccess | GetAllPropertiesSuccess;

export type PropertyThunkAction = ThunkAction<void, RootState, any, PropertyAction>;
