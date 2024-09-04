const mongoose = require('mongoose');
const { VOICE_STATUS, VOICE_LOCALE, VOICE_GENDER } = require('../constants');
const { CRM_PAGE_URL } = require('../configs');

const { ObjectId } = mongoose.Schema.Types;

const voiceSchema = mongoose.Schema(
  {
    userId: { type: String, ref: 'User' },
    categoryId: { type: ObjectId, ref: 'Category' },
    dataset: {
      id: ObjectId,
      name: String,
    },
    code: String,
    index: String,
    lastSentenceCode: String,
    name: String,
    username: String,
    gender: {
      type: String,
      enum: Object.values(VOICE_GENDER),
    },
    avatar: {
      type: String,
      default: `${CRM_PAGE_URL}/avatar-ai-voice.png`,
    },
    locale: {
      type: String,
      enum: Object.values(VOICE_LOCALE),
    },
    province: {
      id: ObjectId,
      name: String,
      code: String,
      locale: {
        type: String,
        enum: Object.values(VOICE_LOCALE),
      },
    },
    description: String,
    email: String,
    status: {
      type: String,
      enum: Object.values(VOICE_STATUS),
      default: VOICE_STATUS.RECORDING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Voice', voiceSchema);
