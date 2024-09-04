const Voice = require('../models/voice');
const daoUtils = require('./utils');

const createVoice = async ({
  userId,
  categoryId,
  dataset = {},
  province = {},
  code,
  name,
  username,
  gender,
  avatar,
  locale,
  description,
  status,
}) => {
  const voice = await Voice.create({
    userId,
    categoryId,
    dataset: {
      id: dataset?.id,
      name: dataset?.name,
    },
    province: {
      id: province?.id,
      name: province?.name,
      code: province?.code,
      locale: province?.locale,
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
  return voice;
};

const updateVoiceById = async (
  id,
  {
    lastSentenceCode,
    name,
    username,
    avatar,
    locale,
    province = {},
    description,
    email,
    status,
    code,
    index,
  },
) => {
  const voice = await Voice.findByIdAndUpdate(
    id,
    {
      lastSentenceCode,
      name,
      username,
      avatar,
      locale,
      province: {
        id: province?.id,
        name: province?.name,
        code: province?.code,
        locale: province?.locale,
      },
      description,
      email,
      status,
      code,
      index,
    },
    {
      new: true,
    },
  );
  return voice;
};

const updateVoiceByIdForAdmin = async (id, { status }) => {
  const voice = await Voice.findByIdAndUpdate(id, { status }, { new: true });
  return voice;
};

const findVoices = async (queryFields) => {
  // eslint-disable-next-line prefer-const
  let { documents: voices, total } = await daoUtils.findAll(Voice, queryFields);
  const voiceIds = voices.map((voice) => voice._id);
  const allFields = Object.keys(Voice.schema.paths);

  const indexCategoryId = allFields.indexOf('categoryId');
  if (indexCategoryId !== -1) {
    allFields[indexCategoryId] = 'category';
  }

  voices = await Voice.aggregate([
    { $match: { _id: { $in: voiceIds } } },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
    { $project: { categoryId: 0 } },
    { $sort: { createdAt: -1 } },
  ]);
  return { voices, total };
};

const deleteVoiceById = async (id) => {
  const voice = await Voice.findByIdAndDelete(id);
  return voice;
};

const findVoiceById = async (id) => {
  const voice = await Voice.findOne({ _id: id }).populate('categoryId').lean();
  if (voice) {
    voice.category = voice.categoryId;
    delete voice.categoryId;
  }
  return voice;
};

const findVoiceByUsername = async (username) => {
  const voice = await Voice.findOne({ username });
  return voice;
};

const countVoicesHaveIndex = async () => {
  const count = await Voice.countDocuments({ index: { $exists: true } });
  return count;
};

module.exports = {
  createVoice,
  updateVoiceById,
  updateVoiceByIdForAdmin,
  findVoices,
  deleteVoiceById,
  findVoiceById,
  findVoiceByUsername,
  countVoicesHaveIndex,
};
