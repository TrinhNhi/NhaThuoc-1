import { Reducer } from 'redux';
import { OrderAction, OrderActionType, OrderState } from './order.types';

const initialState: OrderState = {
  isFetching: false,
  orders: []
};

const orderReducer: Reducer<OrderState, OrderAction> = (state = initialState, action) => {
  switch (action.type) {
    case OrderActionType.ORDER_ACTION_PENDING:
      return { ...state, isFetching: true };
    case OrderActionType.GET_ALL_ORDER_SUCCESS:
      return { ...state, isFetching: false, orders: action.payload };
    case OrderActionType.ORDER_ACTION_FAILURE:
    case OrderActionType.CREATE_ORDER_SUCCESS:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default orderReducer;
