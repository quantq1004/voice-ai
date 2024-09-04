const mongoose = require('mongoose');
const { AUDIO_STATUS } = require('../constants');

const { ObjectId } = mongoose.Schema.Types;

const audioSchema = mongoose.Schema(
  {
    voiceId: { type: ObjectId, ref: 'Voice' },
    audioLink: String,
    quality: {
      noiseness: { type: Boolean, default: false },
      loudness: { type: Boolean, default: false },
      clearly: { type: Boolean, default: false },
      speed: { type: Boolean, default: false },
    },
    sentence: {
      code: String,
      originalText: String,
      normalizedText: String,
      nsws: [
        {
          originalText: String,
          normalizedText: String,
        },
      ],
    },
    status: {
      type: String,
      enum: Object.values(AUDIO_STATUS),
    },
    recordedAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Audio', audioSchema);
