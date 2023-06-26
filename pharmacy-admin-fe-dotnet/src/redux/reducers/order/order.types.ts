import { IOrder } from '@/types/models/IOrder';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export interface OrderState {
  isFetching: boolean;
  orders: IOrder[];
}

export enum OrderActionType {
  ORDER_ACTION_PENDING = 'ORDER_ACTION_PENDING',
  ORDER_ACTION_FAILURE = 'ORDER_ACTION_FAILURE',
  GET_ALL_ORDER_SUCCESS = 'GET_ALL_ORDER_SUCCESS',
  CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
}

export interface OrderActionPending {
  type: OrderActionType.ORDER_ACTION_PENDING;
}

export interface OrderActionFailure {
  type: OrderActionType.ORDER_ACTION_FAILURE;
}

export interface GetAllOrderActionSuccess {
  type: OrderActionType.GET_ALL_ORDER_SUCCESS;
  payload: IOrder[];
}

export interface CreateOrderActionSuccess {
  type: OrderActionType.CREATE_ORDER_SUCCESS;
}

export type OrderAction = OrderActionFailure | OrderActionPending | GetAllOrderActionSuccess | CreateOrderActionSuccess;

export type OrderThunkAction = ThunkAction<void, RootState, any, OrderAction>;
