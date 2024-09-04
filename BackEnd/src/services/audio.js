const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const audioDao = require('../daos/audio');
const {
  AUDIO_STATUS,
  TOTAL_AUDIO_QUALITY_CRITERIA,
  MANDATORY_QUALITY_FIELD,
  AUDIO_WER_ACCEPTANCE_THRESHOLD,
} = require('../constants');
const { invokeLambdaFunction } = require('./aws');
const { checkAudioClearly } = require('./stt');

// Lambda function check audio loudness, noiseness, speedrate
const checkQualityAudio = async ({ audio, audioSource, text }) => {
  const payload = { audio, audio_source: audioSource, text };
  const response = await invokeLambdaFunction({ payload });
  if (!response) throw new CustomError(errorCodes.CALL_LAMBDA_FUNCTION_FAILED);
  return response;
};

const determineAudioStatus = (quality, passQualityCount) => {
  if (passQualityCount === TOTAL_AUDIO_QUALITY_CRITERIA)
    return AUDIO_STATUS.PASSED;

  const mandatoryFieldsPassed = Object.keys(MANDATORY_QUALITY_FIELD)
    .filter((field) => MANDATORY_QUALITY_FIELD[field])
    .every((field) => quality[field]);

  if (mandatoryFieldsPassed) return AUDIO_STATUS.IMPROVEMENT_NEEDED;
  return AUDIO_STATUS.FAILED;
};

const updateAudioById = async (id, { audioLink }) => {
  const audio = await audioDao.getAudioById(id);
  if (!audio) throw new CustomError(errorCodes.NOT_FOUND);

  // check audio clearly and check audio loudness, noiseness, speedrate
  const [responseQualityAudio, responseCheckAudioClearly] = await Promise.all([
    checkQualityAudio({
      audio: audioLink,
      audioSource: 'url',
      text: audio?.sentence?.normalizedText,
    }),
    checkAudioClearly({
      fileUrl: audioLink,
      labelText: audio?.sentence?.normalizedText,
    }),
  ]);

  let audioClearly = false;
  if (responseCheckAudioClearly.wer < AUDIO_WER_ACCEPTANCE_THRESHOLD)
    audioClearly = true;

  const { loudness, noiseness, speedrate } = responseQualityAudio.body;
  const quality = {
    loudness: loudness.check,
    noiseness: noiseness.check,
    speed: speedrate.check,
    clearly: audioClearly,
  };

  // get the number of passed quality criteria
  const passQualityCount = Object.values(quality).filter(Boolean).length;
  const status = determineAudioStatus(quality, passQualityCount);

  // temporary suspend copy audio file to s3
  // if (status !== AUDIO_STATUS.FAILED)
  //   await copyFile({
  //     sourceUrl: audioLink,
  //     fileName: audio?.sentence?.code,
  //     extension: AUDIO_TYPE.WAV,
  //     directory: `voice-cloning/voices/${audio.voiceId}`,
  //   });

  const updateAudio = await audioDao.updateAudioById(id, {
    audioLink,
    status,
    quality,
  });

  return updateAudio;
};

module.exports = { updateAudioById };
