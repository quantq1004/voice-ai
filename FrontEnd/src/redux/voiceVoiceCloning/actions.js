export const actionTypes = {
  ADD_VOICE: 'ADD_VOICE',
};

export const addVoice = (voice) => ({
  type: actionTypes.ADD_VOICE,
  voice,
});
