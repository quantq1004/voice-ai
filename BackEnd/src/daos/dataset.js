const mongoose = require('mongoose');
const Dataset = require('../models/dataset');
const daoUtils = require('./utils');
const { DATASET_STATUS } = require('../constants');

const createDataset = async ({ categoryId, name }) => {
  const dataset = await Dataset.create({ categoryId, name });
  return dataset;
};

const updateDatasetById = async (id, updateFields) => {
  const dataset = await Dataset.findByIdAndUpdate(id, updateFields, {
    new: true,
  });
  return dataset;
};

const findDatasets = async (queryFields) => {
  const { documents: datasets, total } = await daoUtils.findAll(
    Dataset,
    queryFields,
  );
  return { datasets, total };
};

const findRandomDatasetByCategoryId = async (categoryId) => {
  const dataset = await Dataset.aggregate([
    {
      $match: {
        categoryId: mongoose.Types.ObjectId(categoryId),
        status: DATASET_STATUS.PUBLIC,
      },
    },
    { $sample: { size: 1 } },
  ]);
  return dataset[0];
};

module.exports = {
  createDataset,
  updateDatasetById,
  findDatasets,
  findRandomDatasetByCategoryId,
};
