const Sentence = require('../models/sentence');
const daoUtils = require('./utils');

const createSentence = async ({
  code,
  originalText,
  normalizedText,
  nsws,
  datasetId,
}) => {
  const sentence = await Sentence.create({
    code,
    originalText,
    normalizedText,
    nsws,
    datasetId,
  });
  return sentence;
};

const findSentences = async (queryFields) => {
  const { documents: sentences, total } = await daoUtils.findAll(
    Sentence,
    queryFields,
  );
  return { sentences, total };
};

const createSentences = async (sentencesData) => {
  const sentences = await Sentence.insertMany(sentencesData);
  return sentences;
};

const countSentences = async () => {
  const count = await Sentence.countDocuments();
  return count;
};

const findSentencesByDatasetId = async (datasetId) => {
  const sentences = await Sentence.find({ datasetId });
  return sentences;
};

module.exports = {
  createSentence,
  findSentences,
  createSentences,
  countSentences,
  findSentencesByDatasetId,
};
