export const CATEGORIES = [
  { value: 'review', label: 'Review phim' },
  { value: 'news', label: 'Tin tức' },
  { value: 'advertise', label: 'Quảng cáo' },
  { value: 'book', label: 'Sách nói' },
  { value: 'education', label: 'Đào tạo' },
  { value: 'story', label: 'Đọc truyện' },
  { value: 'callcenter', label: 'Tổng đài' },
  { value: 'children', label: 'Trẻ em' },
];

export const AUDIO_TYPE = { WAV: 'wav' };

export const WHITESPACE_REGEX = /\s+/g;

export const TIME_PER_SYLLABLE = 500; // ms

export const MIN_TIME_PER_SENTENCE = 10000; // ms

export const MIN_AUDIO_DURATION = 2000; // ms

export const MILLISECONDS_PER_SECOND = 1000; // ms

export const RECORD_INTERVAL = 250; // ms

export const RECURSIVE_TIMEOUT = 100; // ms

export const PUNCTUATION_REGEX = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]$/;

export const VOICE_LOCALES = {
  NORTHERN: 'northern',
  CENTRAL: 'central',
  SOUTHERN: 'southern',
};

export const GENDER = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
];

export const AUDIO_STATUS = {
  FAILED: 'failed',
  IMPROVEMENT_NEEDED: 'improvement_needed',
  PASSED: 'passed',
  REJECTED: 'rejected',
  APPROVED: 'approved',
};

export const AUDIO_STATUSES = [
  { value: 'allSentence', label: 'allSentence' },
  { value: AUDIO_STATUS.PASSED, label: 'passedSentence' },
  {
    value: AUDIO_STATUS.IMPROVEMENT_NEEDED,
    label: 'improvementNeededSentence',
  },
  { value: AUDIO_STATUS.FAILED, label: 'failedSentence' },
];

export const VOICE_STATUS = {
  RECORDING: 'recording',
  PROCESSING: 'processing',
  FAILED: 'failed',
  PASSED: 'passed',
  PRIVATE_RELEASED: 'private_released',
  PUBLIC_RELEASED: 'public_released',
  UNRELEASED: 'unreleased',
  SUSPENDED: 'suspended',
};

export const VOICE_STATUSES = [
  { value: '', label: 'all' },
  { value: VOICE_STATUS.RECORDING, label: 'recording' },
  { value: VOICE_STATUS.PROCESSING, label: 'voiceProcessing' },
  { value: VOICE_STATUS.PASSED, label: 'passed' },
  { value: VOICE_STATUS.FAILED, label: 'failed' },
  { value: VOICE_STATUS.PRIVATE_RELEASED, label: 'privateReleased' },
  { value: VOICE_STATUS.PUBLIC_RELEASED, label: 'publicReleased' },
  { value: VOICE_STATUS.UNRELEASED, label: 'unreleased' },
  { value: VOICE_STATUS.SUSPENDED, label: 'suspended' },
];

export const VOICE_STATUS_COLORS = {
  [VOICE_STATUS.RECORDING]: 'dark',
  [VOICE_STATUS.PROCESSING]: 'info',
  [VOICE_STATUS.FAILED]: 'red',
  [VOICE_STATUS.PASSED]: 'success',
  [VOICE_STATUS.PRIVATE_RELEASED]: 'success',
  [VOICE_STATUS.PUBLIC_RELEASED]: 'success',
  [VOICE_STATUS.UNRELEASED]: 'red',
  [VOICE_STATUS.SUSPENDED]: 'red',
};

export const USERNAME_EXISTS = 4003;

export const MAX_LENGTH_VOICE_NAME = 25;

export const MIN_LENGTH_USERNAME = 5;

export const MAX_LENGTH_USERNAME = 25;
