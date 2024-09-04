import { actionTypes } from './actions';

export const initialState = {
  provinces: [],
};

const provinceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PROVINCES: {
      const { provinces } = action;
      return { ...state, provinces };
    }

    default:
      return state;
  }
};

export default provinceReducer;
