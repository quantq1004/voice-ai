const callApi = require('../utils/callApi');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { TTS_API_URL } = require('../configs');
const { getAccessToken } = require('./iam');

const createVoiceCloningVoice = async ({
  userId,
  code,
  name,
  gender,
  avatar,
  locale,
  province,
  status,
}) => {
  try {
    const accessToken = await getAccessToken();
    const data = await callApi({
      method: 'POST',
      url: `${TTS_API_URL}/api/v1/voices/voice-cloning`,
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        userId,
        code,
        name,
        gender,
        avatar,
        locale,
        province,
        status,
      },
    });
    return data?.result;
  } catch (error) {
    throw new CustomError(errorCodes.CALL_API_CREATE_VOICE_TTS_FAILED);
  }
};

module.exports = { createVoiceCloningVoice };
