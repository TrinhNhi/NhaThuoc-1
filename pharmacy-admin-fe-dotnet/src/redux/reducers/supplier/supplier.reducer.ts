import { Reducer } from 'redux';
import { SupplierAction, SupplierActionType, SupplierState } from './supplier.types';

const initialState: SupplierState = {
  isFetching: false,
  suppliers: []
};

const supplierReducer: Reducer<SupplierState, SupplierAction> = (state = initialState, action) => {
  switch (action.type) {
    case SupplierActionType.SUPPLIER_ACTION_PENDING:
      return { ...state, isFetching: true };

    case SupplierActionType.SUPPLIER_ACTION_FAILURE:
    case SupplierActionType.CREATE_SUPPLIER_SUCCESS:
    case SupplierActionType.UPDATE_SUPPLIER_SUCCESS:
    case SupplierActionType.CHANGE_STATUS_SUPPLIER_SUCCESS:
      return { ...state, isFetching: false };

    case SupplierActionType.GET_ALL_SUPPLIER_SUCCESS:
      return { ...state, isFetching: false, suppliers: action.payload };
    default:
      return state;
  }
};

export default supplierReducer;
