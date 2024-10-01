// import { RESOURCE } from '@src/constants';
import api from './api';

const getVoices = async () => {
  try {
    const response = await api({
      method: 'GET',
      url: `/voice-cloning/voices`,
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

export { getVoices };
