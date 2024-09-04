import { actionTypes } from './actions';

export const initialState = {
  audios: [],
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_AUDIOS: {
      const { audios } = action;
      return { ...state, audios };
    }
    default:
      return state;
  }
};

export default audioReducer;
