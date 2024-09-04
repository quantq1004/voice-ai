import {
  AUDIO_STATUSES,
  CATEGORIES,
  VOICE_STATUSES,
} from '@src/constants/voiceCloning';

const getCategoryLabel = (value) => {
  const category = CATEGORIES.find((item) => item.value === value);
  return category ? category.label : value;
};

const getAudioStatus = (value) => {
  const status = AUDIO_STATUSES.find((item) => item.value === value);
  return status ? status.label : value;
};

const getVoiceStatusLabel = (value) => {
  const voice = VOICE_STATUSES.find((item) => item.value === value);
  return voice ? voice.label : value;
};

export { getCategoryLabel, getAudioStatus, getVoiceStatusLabel };
