const callApi = require('../utils/callApi');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { UPLOAD_URL } = require('../configs');
const { readFile } = require('../utils/file');

const getPresignedUrlForUploading = async ({
  extension,
  fileName,
  directory,
  accessToken,
}) => {
  try {
    const data = await callApi({
      method: 'GET',
      url: `${UPLOAD_URL}/api/v1/files/presigned-url-for-uploading`,
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { extension, fileName, directory, nonSuffix: true },
    });
    return data?.result?.url;
  } catch (error) {
    throw new CustomError(errorCodes.UPLOAD_ERROR, error.message);
  }
};

const getPresignedUrlForSharing = async (key) => {
  try {
    const data = await callApi({
      method: 'GET',
      url: `${UPLOAD_URL}/api/v1/files/presigned-url-for-sharing`,
      params: { key },
    });
    return data?.result?.url;
  } catch (error) {
    throw new CustomError(errorCodes.UPLOAD_ERROR, error.message);
  }
};

const uploadFileByPresignedUrl = async (url, file) => {
  try {
    await callApi({
      method: 'PUT',
      url,
      data: file,
      headers: { 'Content-Type': 'application/octet-stream' }, // Binary file
      json: true, // Return json response
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
    });
  } catch (error) {
    throw new CustomError(errorCodes.UPLOAD_ERROR, error.message);
  }
};

const getFilenameAndExtension = (filePath) => {
  const fullFilename = filePath.split('/').pop();

  // Split the last segment by '.' to separate the name and extension
  const parts = fullFilename.split('.');
  const extension = parts.pop();
  const name = parts.join('.'); // In case the filename contains dots

  return { name, extension };
};

const uploadToS3 = async (filePath, accessToken, directory) => {
  const { name: fileName, extension } = getFilenameAndExtension(filePath);

  const uploadUrl = await getPresignedUrlForUploading({
    extension,
    fileName,
    directory,
    accessToken,
  });

  const file = await readFile(filePath);
  await uploadFileByPresignedUrl(uploadUrl, file);

  const fileUrl = uploadUrl.split('?')[0];
  return fileUrl;
};

module.exports = {
  getPresignedUrlForUploading,
  getPresignedUrlForSharing,
  uploadFileByPresignedUrl,
  uploadToS3,
};
