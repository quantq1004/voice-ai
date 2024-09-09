const codes = require('./code');

const getErrorMessage = (code) => {
  switch (code) {
    case codes.CREATE_DATASET_FAILED:
      return 'Create dataset failed';
    case codes.COPY_AUDIO_FILE_ERROR:
      return 'Copy file audio failed';
    case codes.VOICE_USERNAME_EXIST:
      return 'Voice username exist';
    case codes.CALL_LAMBDA_FUNCTION_FAILED:
      return 'Call lambda function failed';
    case codes.NO_ENOUGH_CONDITION_SUBMIT_VOICE:
      return 'No enough condition to submit voice';
    case codes.VOICE_USERNAME_INVALID:
      return 'Voice username invalid';
    case codes.EMAIL_INVALID:
      return 'Email invalid';
    case codes.SEND_EMAIL_FAILED:
      return 'Send email failed';
    case codes.INVALID_VOICE_STATUS:
      return 'Invalid voice status';
    case codes.CREATE_AUDIOS_FAILED:
      return 'Create audios failed';
    case codes.CALL_API_CHECK_AUDIO_CLEARY_FAILED:
      return 'Call api check audio clearly failed';
    case codes.CALL_API_CREATE_VOICE_TTS_FAILED:
      return 'Call api create voice tts failed';
    case codes.USER_EXISTS:
      return 'User exists';
    case codes.USER_NOT_FOUND:
      return 'User not found';
    default:
      return null;
  }
};

module.exports = getErrorMessage;
