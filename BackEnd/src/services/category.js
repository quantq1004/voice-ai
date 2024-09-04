const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const datasetDao = require('../daos/dataset');
const sentenceDao = require('../daos/sentence');
const { SENTENCE_CODE_MAX, SENTENCE_CODE_START } = require('../constants');

const createDataset = async ({ categoryId, name, sentencesArray }) => {
  const dataset = await datasetDao.createDataset({
    categoryId,
    name,
  });
  if (!dataset) throw new CustomError(errorCodes.CREATE_DATASET_FAILED);

  const datasetId = dataset.id;

  const sentenceCount = await sentenceDao.countSentences();

  let sentenceCode = '';
  if (sentenceCount > 0) {
    const newCodeNumber =
      sentenceCount < SENTENCE_CODE_MAX ? sentenceCount + 1 : SENTENCE_CODE_MAX;
    sentenceCode = newCodeNumber.toString().padStart(7, '0');
  } else {
    sentenceCode = SENTENCE_CODE_START;
  }

  const sentencesData = sentencesArray.map((sentence, index) => ({
    ...sentence,
    code: (parseInt(sentenceCode, 10) + index).toString().padStart(7, '0'),
    datasetId,
  }));

  await sentenceDao.createSentences(sentencesData);
  return dataset;
};

module.exports = { createDataset };
