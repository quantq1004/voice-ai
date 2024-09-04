const mongoose = require('mongoose');
const { VOICE_LOCALE } = require('../constants');

const provinceSchema = mongoose.Schema(
  {
    name: String,
    code: String,
    locale: {
      type: String,
      enum: Object.values(VOICE_LOCALE),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Province', provinceSchema);
