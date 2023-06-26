import { Reducer } from 'redux';
import { PropertyAction, PropertyActionType, PropertyState } from './property.type';

const initialState: PropertyState = {
  isFetching: false,
  properties: []
};

const propertyReducer: Reducer<PropertyState, PropertyAction> = (state = initialState, action) => {
  switch (action.type) {
    case PropertyActionType.PROPERTY_ACTION_PENDING:
      return { ...state, isFetching: true };
    case PropertyActionType.PROPERTY_ACTION_FAILURE:
      return { ...state, isFetching: false };
    case PropertyActionType.GET_ALL_PROPERTIES_SUCCESS:
      return { ...state, isFetching: false, properties: action.payload };
    case PropertyActionType.CREATE_PROPERTY_SUCCESS:
    case PropertyActionType.UPDATE_PROPERTY_SUCCESS:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default propertyReducer;
