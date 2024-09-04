const voiceDao = require('../daos/voice');
const audioDao = require('../daos/audio');
const voiceService = require('../services/voice');

const createVoice = async (req, res) => {
  const { userId } = req;
  const {
    categoryId,
    name,
    username,
    gender,
    avatar,
    locale,
    province,
    description,
    status,
    provinceId,
  } = req.body;
  const voice = await voiceService.createVoice({
    userId,
    categoryId,
    name,
    username,
    gender,
    avatar,
    locale,
    province,
    description,
    status,
    provinceId,
  });
  return res.send({ voice });
};

const updateVoice = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const {
    lastSentenceCode,
    code,
    name,
    username,
    gender,
    avatar,
    locale,
    description,
    email,
    status,
    provinceId,
  } = req.body;
  const voice = await voiceService.updateVoiceById(id, {
    userId,
    lastSentenceCode,
    code,
    name,
    username,
    gender,
    avatar,
    locale,
    provinceId,
    description,
    email,
    status,
  });
  return res.send({ voice });
};

const getVoices = async (req, res) => {
  const { search, searchFields, fields, offset, limit, sort } = req.query;
  const { userId } = req.user;
  const query = {};

  query.query = { userId };
  if (search) query.search = search;
  if (searchFields) query.searchFields = searchFields.split(',');
  if (fields) query.fields = fields.split(',');
  if (offset) query.offset = parseInt(offset, 10);
  if (limit) query.limit = parseInt(limit, 10);
  if (sort) query.sort = sort.split(',');

  Object.keys(req.query)
    .filter(
      (q) =>
        ['search', 'searchFields', 'fields', 'offset', 'limit', 'sort'].indexOf(
          q,
        ) === -1,
    )
    .forEach((q) => {
      query.query[q] = ['true', 'false'].includes(req.query[q])
        ? JSON.parse(req.query[q])
        : req.query[q];
    });
  const { voices, total } = await voiceDao.findVoices(query);

  return res.send({ voices, total });
};

const deleteVoice = async (req, res) => {
  const { id } = req.params;
  await voiceDao.deleteVoiceById(id);
  return res.send({});
};

const getAudios = async (req, res) => {
  const { search, searchFields, fields, offset, limit, sort } = req.query;

  const { id: voiceId } = req.params;
  const query = {};

  query.query = { voiceId };
  if (search) query.search = search;
  if (searchFields) query.searchFields = searchFields.split(',');
  if (fields) query.fields = fields.split(',');
  if (offset) query.offset = parseInt(offset, 10);
  if (limit) query.limit = parseInt(limit, 10);
  if (sort) query.sort = sort.split(',');

  Object.keys(req.query)
    .filter(
      (q) =>
        ['search', 'searchFields', 'fields', 'offset', 'limit', 'sort'].indexOf(
          q,
        ) === -1,
    )
    .forEach((q) => {
      query.query[q] = ['true', 'false'].includes(req.query[q])
        ? JSON.parse(req.query[q])
        : req.query[q];
    });
  const { audios, total } = await audioDao.findAudios(query);

  return res.send({ audios, total });
};

const getVoiceById = async (req, res) => {
  const { id } = req.params;
  const voice = await voiceDao.findVoiceById(id);
  return res.send({ voice });
};

const getVoiceByIdForAdmin = async (req, res) => {
  const { id } = req.params;
  const voice = await voiceService.getVoiceByIdForAdmin(id);
  return res.send({ voice });
};

const getVoicesForAdmin = async (req, res) => {
  const { search, searchFields, fields, offset, limit, sort } = req.query;
  const query = {};

  query.query = {};
  if (search) query.search = search;
  if (searchFields) query.searchFields = searchFields.split(',');
  if (fields) query.fields = fields.split(',');
  if (offset) query.offset = parseInt(offset, 10);
  if (limit) query.limit = parseInt(limit, 10);
  if (sort) query.sort = sort.split(',');

  Object.keys(req.query)
    .filter(
      (q) =>
        ['search', 'searchFields', 'fields', 'offset', 'limit', 'sort'].indexOf(
          q,
        ) === -1,
    )
    .forEach((q) => {
      query.query[q] = ['true', 'false'].includes(req.query[q])
        ? JSON.parse(req.query[q])
        : req.query[q];
    });
  const { voices, total } = await voiceDao.findVoices(query);

  return res.send({ voices, total });
};

const getAudiosDownloadUrl = async (req, res) => {
  const { id } = req.params;
  const uploadLink = await voiceService.getAudiosDownloadUrl(id);
  return res.send({ link: uploadLink });
};

const checkConditionSubmitVoice = async (req, res) => {
  const { id } = req.params;
  const isEnoughCondition = await voiceService.checkConditionSubmitVoice(id);
  return res.send({ isEnoughCondition });
};

const updateVoiceForAdmin = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const voice = await voiceService.updateVoiceForAdmin(id, {
    status,
  });
  return res.send({ voice });
};

module.exports = {
  createVoice,
  updateVoice,
  getVoices,
  deleteVoice,
  getAudios,
  getVoiceById,
  getVoicesForAdmin,
  getVoiceByIdForAdmin,
  getAudiosDownloadUrl,
  checkConditionSubmitVoice,
  updateVoiceForAdmin,
};
