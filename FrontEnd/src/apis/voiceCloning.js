import { RESOURCE } from '@src/constants';
import api from './api';

const createVoiceCloningVoice = async ({
  categoryId,
  name,
  username,
  gender,
  avatar,
  locale,
  description,
  provinceId,
}) => {
  try {
    const response = await api({
      method: 'POST',
      url: `${RESOURCE.VOICE_CLONING}/voices`,
      data: {
        categoryId,
        name,
        username,
        gender,
        avatar,
        locale,
        description,
        provinceId,
      },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getVoiceCloningVoices = async () => {
  try {
    const response = await api({
      method: 'GET',
      url: `${RESOURCE.VOICE_CLONING}/voices`,
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const updateVoiceCloningVoice = async (voiceId, data) => {
  try {
    const response = await api({
      method: 'PUT',
      url: `${RESOURCE.VOICE_CLONING}/voices/${voiceId}`,
      data,
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getVoiceCloningCategories = async () => {
  try {
    const response = await api({
      method: 'GET',
      url: `${RESOURCE.VOICE_CLONING}/categories`,
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getVoiceCloningAudios = async (voiceId) => {
  try {
    const response = await api({
      method: 'GET',
      url: `${RESOURCE.VOICE_CLONING}/voices/${voiceId}/audios`,
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const updateVoiceCloningAudio = async (audioId, data) => {
  try {
    const response = await api({
      method: 'PUT',
      url: `${RESOURCE.VOICE_CLONING}/audios/${audioId}`,
      data,
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getVoiceCloningVoice = async (voiceId) => {
  try {
    const response = await api({
      method: 'GET',
      url: `${RESOURCE.VOICE_CLONING}/voices/${voiceId}`,
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getVoiceCloningProvinces = async ({
  search,
  searchFields,
  offset,
  limit,
  fields,
  sort,
  locale,
}) => {
  try {
    const response = await api({
      method: 'GET',
      url: `${RESOURCE.VOICE_CLONING}/provinces`,
      params: {
        search,
        searchFields,
        offset,
        limit,
        fields,
        sort,
        locale,
      },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getVoiceCloningVoiceSubmitCheck = async (voiceId) => {
  try {
    const response = await api({
      method: 'GET',
      url: `${RESOURCE.VOICE_CLONING}/voices/${voiceId}/submit-check`,
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

export {
  createVoiceCloningVoice,
  getVoiceCloningVoices,
  updateVoiceCloningVoice,
  getVoiceCloningCategories,
  getVoiceCloningAudios,
  updateVoiceCloningAudio,
  getVoiceCloningVoice,
  getVoiceCloningProvinces,
  getVoiceCloningVoiceSubmitCheck,
};
