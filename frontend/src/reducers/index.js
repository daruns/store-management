import { combineReducers } from 'redux';
import { StoreReducer } from './storeReducers';
import { CategoryReducer } from './categoryReducers';
import { ProductReducer } from './productReducers';


export default combineReducers({
  store: StoreReducer,
  category: CategoryReducer,
  product: ProductReducer
});