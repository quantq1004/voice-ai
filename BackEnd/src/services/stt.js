const callApi = require('../utils/callApi');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const {
  STT_RESPONSE_TYPE,
  STT_SAMPLE_RATE_HERTZ,
  STT_SAMPLE_SIZE_BYTE,
  STT_CHANNEL,
  STT_DOMAIN,
} = require('../constants');
const { STT_URL, STT_TOKEN, STT_APP_ID } = require('../configs');

const checkAudioClearly = async ({
  responseType = STT_RESPONSE_TYPE,
  sampleRateHertz = STT_SAMPLE_RATE_HERTZ,
  sampleSizeByte = STT_SAMPLE_SIZE_BYTE,
  channel = STT_CHANNEL,
  domain = STT_DOMAIN,
  fileUrl,
  labelText,
}) => {
  try {
    const data = await callApi({
      method: 'POST',
      url: `${STT_URL}/api/v1/stt/experiment`,
      headers: { Authorization: `Bearer ${STT_TOKEN}`, 'App-ID': STT_APP_ID },
      data: {
        responseType,
        sampleRateHertz,
        sampleSizeByte,
        channel,
        domain,
        fileUrl,
        labelText,
      },
    });
    return data?.result;
  } catch (error) {
    throw new CustomError(errorCodes.CALL_API_CHECK_AUDIO_CLEARY_FAILED);
  }
};

module.exports = { checkAudioClearly };
