import { FETCH_STORES } from '../actions/types';
const initialState = {
  stores: []
};

export const StoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORES:
      return {
        ...state,
        stores: action.payload.stores,
      };
    default:
      return state;
  }
}