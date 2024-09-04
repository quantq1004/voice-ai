import { actionTypes } from './actions';

export const initialState = {
  voice: {},
};

const voiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_VOICE: {
      const { voice } = action;
      return { ...state, voice };
    }
    default:
      return state;
  }
};

export default voiceReducer;
