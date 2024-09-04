const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { getAccessToken } = require('./iam');
const callApi = require('../utils/callApi');
const { UPLOAD_URL } = require('../configs');

const copyFile = async ({
  sourceUrl,
  fileName,
  extension,
  directory,
  nonSuffix = true,
}) => {
  try {
    const accessToken = await getAccessToken();
    const response = await callApi({
      method: 'POST',
      data: { sourceUrl, fileName, extension, directory, nonSuffix },
      url: `${UPLOAD_URL}/api/v1/files/copy`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    throw new CustomError(errorCodes.COPY_AUDIO_FILE_ERROR);
  }
};

module.exports = { copyFile };
