const sentenceDao = require('../daos/sentence');

const createSentence = async (req, res) => {
  const { code, originalText, normalizedText, nsws, datasetId } = req.body;
  const sentence = await sentenceDao.createSentence({
    code,
    originalText,
    normalizedText,
    nsws,
    datasetId,
  });
  return res.send({ sentence });
};

const getSentences = async (req, res) => {
  const { search, fields, offset, limit, sort } = req.query;
  const query = {};

  query.query = {};
  if (search) query.search = search;
  if (fields) query.fields = fields.split(',');
  if (offset) query.offset = parseInt(offset, 10);
  if (limit) query.limit = parseInt(limit, 10);
  if (sort) query.sort = sort.split(',');

  Object.keys(req.query)
    .filter(
      (q) => ['search', 'fields', 'offset', 'limit', 'sort'].indexOf(q) === -1,
    )
    .forEach((q) => {
      query.query[q] = ['true', 'false'].includes(req.query[q])
        ? JSON.parse(req.query[q])
        : req.query[q];
    });

  const { sentences, total } = await sentenceDao.findSentences(query);

  return res.send({ sentences, total });
};

module.exports = { createSentence, getSentences };
