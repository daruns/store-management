import { FETCH_CATEGORIES } from '../actions/types';
const initialState = {
  categories: []
};

export const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
      };
    default:
      return state;
  }
}