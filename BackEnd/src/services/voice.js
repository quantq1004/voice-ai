const uuid = require('uuid');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const datasetDao = require('../daos/dataset');
const voiceDao = require('../daos/voice');
const audioDao = require('../daos/audio');
const sentenceDao = require('../daos/sentence');
const provinceDao = require('../daos/province');
const categoryDao = require('../daos/category');
const {
  USERNAME_REGEX,
  VOICE_INDEX_MAX,
  VOICE_INDEX_START,
  AUDIO_STATUS,
  VOICE_ACCEPTANCE_THRESHOLD,
  VOICE_STATUS,
} = require('../constants');
const fileService = require('./file');
const uploadService = require('./upload');
const iamService = require('./iam');
const { sendUltraMailer } = require('./notification/ultraMail');
const { validateEmail } = require('../utils/checkValid');
const { createVoiceCloningVoice } = require('./tts');

const getCategory = async (categoryId) => {
  const category = await categoryDao.getCategoryById(categoryId);
  return category;
};

const getDataset = async (categoryId) => {
  const dataset = await datasetDao.findRandomDatasetByCategoryId(categoryId);
  return dataset;
};

const checkValidUsername = (username) => USERNAME_REGEX.test(username);

const checkVoiceUsernameExist = async (username) => {
  const voice = await voiceDao.findVoiceByUsername(username);
  return !!voice;
};

const createVoice = async ({
  userId,
  categoryId,
  name,
  username,
  gender,
  avatar,
  locale,
  description,
  status,
  provinceId,
}) => {
  // Check valid and exist username for voice
  if (username) {
    const isUsernameExist = await checkVoiceUsernameExist(username);
    if (isUsernameExist) throw new CustomError(errorCodes.VOICE_USERNAME_EXIST);
    const isValidUsername = checkValidUsername(username);
    if (!isValidUsername)
      throw new CustomError(errorCodes.VOICE_USERNAME_INVALID);
  }

  // Generate a dataset for voice
  let dataset = null;
  if (categoryId) {
    dataset = await getDataset(categoryId);
    if (!dataset) throw new CustomError(errorCodes.NOT_FOUND);
  }

  // Generate a province for voice
  let province = null;
  if (provinceId) {
    province = await provinceDao.getProvinceById(provinceId);
    if (!province) throw new CustomError(errorCodes.NOT_FOUND);
  }

  // Get category to generate category name for voice
  let category = null;
  if (categoryId) {
    category = await getCategory(categoryId);
    if (!category) throw new CustomError(errorCodes.NOT_FOUND);
  }

  const sentences = await sentenceDao.findSentencesByDatasetId(dataset._id);
  if (!sentences) throw new CustomError(errorCodes.NOT_FOUND);

  // Generate a code for voice
  let code = null;
  const conditionGenerateCode =
    locale && province && gender && username && category;
  if (conditionGenerateCode) {
    const localeCode = locale.charAt(0);
    code = `${localeCode}_${province.code}_${gender}_${username}_${category.name}_vc`;
  }

  const voice = await voiceDao.createVoice({
    userId,
    categoryId,
    dataset: {
      id: dataset._id,
      name: dataset.name,
    },
    province: {
      id: province._id,
      name: province.name,
      code: province.code,
      locale: province.locale,
    },
    code,
    name,
    username,
    gender,
    avatar,
    locale,
    description,
    status,
  });

  const audiosData = sentences.map((sentence) => ({
    voiceId: voice._id,
    sentence: {
      code: sentence.code,
      originalText: sentence.originalText,
      normalizedText: sentence.normalizedText,
      nsws: sentence.nsws,
    },
  }));

  const audios = await audioDao.createAudios(audiosData);
  if (!audios) throw new CustomError(errorCodes.CREATE_AUDIOS_FAILED);

  return voice;
};

const getVoiceByIdForAdmin = async (id) => {
  const voice = await voiceDao.findVoiceById(id);
  const audios = await audioDao.getAudiosByVoiceId(id);

  voice.totalAudioPassed = 0;
  voice.totalAudioImprovementNeeded = 0;
  voice.totalAudioFailed = 0;
  voice.totalAudioRejected = 0;
  voice.totalAudioApproved = 0;

  audios.forEach((audio) => {
    switch (audio.status) {
      case AUDIO_STATUS.PASSED: {
        voice.totalAudioPassed += 1;
        break;
      }
      case AUDIO_STATUS.IMPROVEMENT_NEEDED: {
        voice.totalAudioImprovementNeeded += 1;
        break;
      }
      case AUDIO_STATUS.FAILED: {
        voice.totalAudioFailed += 1;
        break;
      }
      case AUDIO_STATUS.REJECTED: {
        voice.totalAudioRejected += 1;
        break;
      }
      case AUDIO_STATUS.APPROVED: {
        voice.totalAudioApproved += 1;
        break;
      }
      default:
        break;
    }
  });

  return voice;
};

const calculateRateAudioAccept = async (voiceId) => {
  const audios = await audioDao.getAudiosByVoiceId(voiceId);

  const totalAudioPassed = audios.filter(
    (audio) => audio.status === AUDIO_STATUS.PASSED,
  ).length;

  const totalAudioImprovementNeeded = audios.filter(
    (audio) => audio.status === AUDIO_STATUS.IMPROVEMENT_NEEDED,
  ).length;

  const totalAudioApproved = audios.filter(
    (audio) => audio.status === AUDIO_STATUS.APPROVED,
  ).length;

  const totalAudioAccept =
    totalAudioPassed + totalAudioImprovementNeeded + totalAudioApproved;
  const totalAudio = audios.length;
  const percentageAudioAccept = totalAudioAccept / totalAudio;
  return percentageAudioAccept;
};

const checkConditionSubmitVoice = async (voiceId) => {
  // Check condition to submit voice
  const rateAudioAccept = await calculateRateAudioAccept(voiceId);
  if (rateAudioAccept < VOICE_ACCEPTANCE_THRESHOLD)
    throw new CustomError(errorCodes.NO_ENOUGH_CONDITION_SUBMIT_VOICE);
  return true;
};

const generateVoiceIndex = async () => {
  let voiceIndex;
  const voiceIndexCount = await voiceDao.countVoicesHaveIndex();
  if (voiceIndexCount > 0) {
    const newIndexNumber =
      voiceIndexCount < VOICE_INDEX_MAX ? voiceIndexCount + 1 : VOICE_INDEX_MAX;
    voiceIndex = newIndexNumber.toString().padStart(4, '0');
  } else voiceIndex = VOICE_INDEX_START;

  return voiceIndex;
};

const updateVoiceById = async (
  id,
  {
    lastSentenceCode,
    name,
    username,
    avatar,
    locale,
    provinceId,
    description,
    email,
    status,
  },
) => {
  // Get voice current
  const voiceCurrent = await voiceDao.findVoiceById(id);
  if (!voiceCurrent) throw new CustomError(errorCodes.NOT_FOUND);

  // Check valid and exist username for voice
  if (username) {
    const isUsernameExist = await checkVoiceUsernameExist(username);
    if (isUsernameExist) throw new CustomError(errorCodes.VOICE_USERNAME_EXIST);
    const isValidUsername = checkValidUsername(username);
    if (!isValidUsername)
      throw new CustomError(errorCodes.VOICE_USERNAME_INVALID);
  }

  // Generate a province for voice
  let voiceProvince = null;
  if (provinceId) {
    voiceProvince = await provinceDao.getProvinceById(provinceId);
    if (!voiceProvince) throw new CustomError(errorCodes.NOT_FOUND);
  } else voiceProvince = voiceCurrent.province;

  // Generate a code for voice
  let voiceCode = null;
  const provinceCode = voiceProvince?.code || voiceCurrent.province.code;
  const localeCode = locale?.charAt(0) || voiceCurrent.locale.charAt(0);
  const usernameUpdate = username || voiceCurrent.username;

  const conditionGenerateCode =
    voiceCurrent && provinceCode && localeCode && usernameUpdate;

  if (conditionGenerateCode) {
    if (voiceCode === voiceCurrent.code) voiceCode = voiceCurrent.code;
    else
      voiceCode = `${localeCode}_${provinceCode}_${voiceCurrent.gender}_${usernameUpdate}_${voiceCurrent?.category?.name}_vc`;
  }

  // Validate email and generate a index for voice
  let voiceIndex = null;
  if (email) {
    const isValid = validateEmail(email);
    if (!isValid) throw new CustomError(errorCodes.EMAIL_INVALID);
    // Generate a index for voice
    if (!voiceCurrent.index) voiceIndex = await generateVoiceIndex();
    else voiceIndex = voiceCurrent.index;
  }

  const updateData = {
    lastSentenceCode,
    name,
    username,
    avatar,
    locale,
    province: voiceProvince,
    description,
    email,
    status,
    code: voiceCode,
  };

  if (voiceIndex) updateData.index = voiceIndex;

  // when voice status is private released, call api create voice cloning voice from tts api service
  if (status === VOICE_STATUS.PRIVATE_RELEASED) {
    const {
      userId,
      code,
      name: nameCurrent,
      gender,
      avatar: avatarCurrent,
      locale: localeCurrent,
      province,
    } = voiceCurrent;

    await createVoiceCloningVoice({
      userId,
      code,
      name: nameCurrent,
      gender,
      avatar: avatarCurrent,
      locale: localeCurrent,
      province: province?.name,
      status,
    });
  }

  const voice = await voiceDao.updateVoiceById(id, updateData);
  return voice;
};

const getContentJson = async (voice) => {
  const audios = await audioDao.getAudiosByVoiceId(voice._id);
  const datasetName = voice.dataset.name;
  const sentences = audios.map(({ sentence }) => ({
    code: sentence.code,
    original_text: sentence.originalText,
    normalized_text: sentence.normalizedText,
    nsws: sentence.nsws.map(({ originalText, normalizedText }) => ({
      original_text: originalText,
      normalized_text: normalizedText,
    })),
  }));
  return {
    dataset_name: datasetName,
    sentences,
  };
};

// Get audio urls by voice id for download
const getAudiosUrlByVoiceId = async (voiceId) => {
  const queryFields = {
    query: { voiceId, status: AUDIO_STATUS.APPROVED },
  };
  const response = await audioDao.findAudios(queryFields);
  if (!response) throw new CustomError(errorCodes.NOT_FOUND);
  const fileUrls = response.audios.map((audio) => audio.audioLink);
  return fileUrls;
};

const getAudiosDownloadUrl = async (id) => {
  const voice = await voiceDao.findVoiceById(id);
  const { index, code } = voice;
  const nameFileZip = `${index}_${code}.zip`;
  const nameFileJson = `${index}_${code}.json`;

  // Create sub directory for public folder
  const subDir = uuid.v4();

  // Get audio urls by voice id
  const fileUrls = await getAudiosUrlByVoiceId(id);
  const publicDir = fileService.createPublicDirectory(subDir);

  const contentVoiceJson = await getContentJson(voice);
  fileService.createFileJson(contentVoiceJson, nameFileJson, publicDir);

  // Download files from S3 to public folder and zip it
  await fileService.downloadFiles(fileUrls, publicDir);
  const zipPath = await fileService.zipFiles(publicDir, subDir, nameFileZip);

  // Handle upload file zip to S3
  const directorySaveS3 = `voice-cloning/voices/${id}`;
  const accessToken = await iamService.getAccessToken();
  const uploadLink = await uploadService.uploadToS3(
    zipPath,
    accessToken,
    directorySaveS3,
  );

  // Cleanup files for public folder after upload to S3
  fileService.cleanupPublicFolder(publicDir);

  return uploadLink;
};

const updateVoiceForAdmin = async (id, { status }) => {
  const voiceInfo = await voiceDao.findVoiceById(id);
  if (voiceInfo.email) {
    const response = await sendUltraMailer({
      voiceName: voiceInfo.name,
      email: voiceInfo.email,
      status,
    });
    if (!response) throw new CustomError(errorCodes.SEND_EMAIL_FAILED);
  }
  const voice = await voiceDao.updateVoiceByIdForAdmin(id, { status });

  return voice;
};

module.exports = {
  createVoice,
  getVoiceByIdForAdmin,
  updateVoiceById,
  getAudiosUrlByVoiceId,
  getAudiosDownloadUrl,
  checkConditionSubmitVoice,
  getContentJson,
  updateVoiceForAdmin,
};
