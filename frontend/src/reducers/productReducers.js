import { FETCH_PRODUCTS } from '../actions/types';
const initialState = {
  products: []
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
      };
    default:
      return state;
  }
}