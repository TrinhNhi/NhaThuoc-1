import { Reducer, combineReducers } from 'redux';
import drugReducer from './drug/drug.reducer';
import supplierReducer from './supplier/supplier.reducer';
import propertyReducer from './property/property.reducer';

const rootReducer = combineReducers({
  drug: drugReducer,
  supplier: supplierReducer,
  property: propertyReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const reducer: Reducer<RootState, any> = (state: RootState | undefined, action: any) => rootReducer(state, action);

export default reducer;
