import { actionTypes } from './actions';

export const initialState = {
  category: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_CATEGORY: {
      const { category } = action;
      return { ...state, category };
    }
    default:
      return state;
  }
};

export default categoryReducer;
