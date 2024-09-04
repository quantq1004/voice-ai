const VOICE_STATUS = {
  RECORDING: 'recording',
  PROCESSING: 'processing',
  PASSED: 'passed',
  FAILED: 'failed',
  PRIVATE_RELEASED: 'private_released',
  PUBLIC_RELEASED: 'public_released',
  UNRELEASED: 'unreleased',
  SUSPENDED: 'suspended',
};

const VOICE_LOCALE = {
  NORTHERN: 'northern',
  CENTRAL: 'central',
  SOUTHERN: 'southern',
};

const VOICE_GENDER = {
  MALE: 'male',
  FEMALE: 'female',
};

const AUDIO_STATUS = {
  FAILED: 'failed',
  IMPROVEMENT_NEEDED: 'improvement_needed',
  PASSED: 'passed',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

const SENTENCE_CODE_MAX = 9999999;

const SENTENCE_CODE_START = '0000001';

const DATASET_STATUS = {
  DRAFT: 'draft',
  PUBLIC: 'public',
  SUSPENDED: 'suspended',
};

const TOTAL_AUDIO_QUALITY_CRITERIA = 4;

const AUDIO_TYPE = { WAV: 'wav' };

const WHITESPACE_REGEX = /\s+/g;

const LAMBDA_FUNCTION_TIMEOUT = 3 * 60 * 1000; // 3 minutes

const VOICE_INDEX_MAX = 9999;

const VOICE_INDEX_START = '0001';

const VOICE_ACCEPTANCE_THRESHOLD = 0.9; // 90%

const USERNAME_REGEX = /^[a-z0-9]{5,25}$/;

const EMAIL_REGEX =
  /^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/;

// Quality fields that are mandatory to be checked
const MANDATORY_QUALITY_FIELD = {
  loudness: true,
  noiseness: true,
  speed: false,
  clearly: true,
};

const EMAIL_TYPE = {
  RECORDING: 'recording_email_type',
  PASSED: 'passed_email_type',
  FAILED: 'failed_email_type',
  SUSPENDED: 'suspended_email_type',
};

const EMAIL_SUBJECT = {
  RECORDING: '[Vbee AIVoice Cloning] - Yêu cầu thu âm lại',
  PASSED: '[Vbee AIVoice Cloning] - Yêu cầu xử lý tạo giọng đọc thành công',
  FAILED: '[Vbee AIVoice Cloning] - Yêu cầu xử lý tạo giọng đọc thất bại',
  SUSPENDED: '[Vbee AIVoice Cloning] - Đình chỉ giọng đọc',
};

// audio clearly
const STT_RESPONSE_TYPE = 'direct';

const STT_SAMPLE_RATE_HERTZ = '48000';

const STT_SAMPLE_SIZE_BYTE = '2';

const STT_CHANNEL = '1';

const STT_DOMAIN = 'phone_call';

const AUDIO_WER_ACCEPTANCE_THRESHOLD = 0.5;

const A_WEEK = 7 * 86400 * 1000;

module.exports = {
  VOICE_STATUS,
  VOICE_LOCALE,
  VOICE_GENDER,
  AUDIO_STATUS,
  SENTENCE_CODE_MAX,
  SENTENCE_CODE_START,
  DATASET_STATUS,
  TOTAL_AUDIO_QUALITY_CRITERIA,
  AUDIO_TYPE,
  WHITESPACE_REGEX,
  LAMBDA_FUNCTION_TIMEOUT,
  VOICE_INDEX_MAX,
  VOICE_INDEX_START,
  VOICE_ACCEPTANCE_THRESHOLD,
  MANDATORY_QUALITY_FIELD,
  USERNAME_REGEX,
  EMAIL_REGEX,
  EMAIL_TYPE,
  EMAIL_SUBJECT,
  STT_RESPONSE_TYPE,
  STT_SAMPLE_RATE_HERTZ,
  STT_SAMPLE_SIZE_BYTE,
  STT_CHANNEL,
  STT_DOMAIN,
  AUDIO_WER_ACCEPTANCE_THRESHOLD,
  A_WEEK,
};
