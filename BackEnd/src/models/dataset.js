const mongoose = require('mongoose');
const { DATASET_STATUS } = require('../constants');

const { ObjectId } = mongoose.Schema.Types;

const datasetSchema = mongoose.Schema(
  {
    categoryId: { type: ObjectId, ref: 'Category' },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(DATASET_STATUS),
      default: DATASET_STATUS.DRAFT,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Dataset', datasetSchema);
