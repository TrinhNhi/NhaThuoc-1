import { Reducer } from 'redux';
import { DrugAction, DrugActionType, DrugState } from './drug.type';

const initialState: DrugState = {
  isFetching: false,
  drugs: []
};

const drugReducer: Reducer<DrugState, DrugAction> = (state = initialState, action) => {
  switch (action.type) {
    case DrugActionType.DRUG_ACTION_PENDING:
      return { ...state, isFetching: true };
    case DrugActionType.DRUG_ACTION_FAILURE:
      return { ...state, isFetching: false };

    case DrugActionType.GET_ALL_DRUGS_SUCCESS:
      return { ...state, isFetching: false, drugs: action.payload };

    case DrugActionType.CHANGE_DRUG_STATUS_SUCCESS:
    case DrugActionType.CREATE_DRUG_SUCCESS:
    case DrugActionType.UPDATE_DRUG_SUCCESS:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default drugReducer;
