const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const sentenceSchema = mongoose.Schema(
  {
    datasetId: { type: ObjectId, ref: 'Dataset' },
    code: String,
    originalText: String,
    normalizedText: String,
    // nsw stands for nonstandard word
    nsws: [
      {
        originalText: String,
        normalizedText: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Sentence', sentenceSchema);
