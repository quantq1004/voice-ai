export const actionTypes = {
  UPDATE_AUDIOS: 'UPDATE_AUDIOS',
};

export const updateAudios = (audios) => ({
  type: actionTypes.UPDATE_AUDIOS,
  audios,
});
