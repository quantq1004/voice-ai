const Category = require('../models/category');
const daoUtils = require('./utils');
const { DATASET_STATUS } = require('../constants');

const createCategory = async ({ icon, name }) => {
  const category = await Category.create({ icon, name });
  return category;
};

const updateCategoryById = async (id, updateFields) => {
  const category = await Category.findByIdAndUpdate(id, updateFields, {
    new: true,
  });
  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  return category;
};

const findCategories = async (queryFields) => {
  let { documents: categories, total } = await daoUtils.findAll(
    Category,
    queryFields,
  );

  categories = await Category.aggregate([
    {
      $lookup: {
        from: 'datasets',
        localField: '_id',
        foreignField: 'categoryId',
        as: 'datasets',
      },
    },
    {
      $match: {
        'datasets.status': DATASET_STATUS.PUBLIC, // Filter only categories with at least one public dataset
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        icon: 1,
      },
    },
  ]);
  total = categories.length;
  return { categories, total };
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  return category;
};

const findCategoriesForAdmin = async (queryFields) => {
  // eslint-disable-next-line prefer-const
  let { documents: categories, total } = await daoUtils.findAll(
    Category,
    queryFields,
  );

  categories = await Category.aggregate([
    {
      $lookup: {
        from: 'datasets',
        localField: '_id',
        foreignField: 'categoryId',
        as: 'datasets',
      },
    },
    { $unwind: { path: '$datasets', preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        icon: { $first: '$icon' },
        numberOfDatasets: { $sum: 1 },
        hasDataset: { $first: { $gt: ['$datasets', null] } },
      },
    },
    { $sort: { name: 1 } },
    {
      $project: {
        _id: 1,
        name: 1,
        icon: 1,
        numberOfDatasets: {
          $cond: [{ $eq: ['$hasDataset', false] }, 0, '$numberOfDatasets'],
        },
      },
    },
  ]);

  return { categories, total };
};

module.exports = {
  createCategory,
  updateCategoryById,
  deleteCategory,
  findCategories,
  getCategoryById,
  findCategoriesForAdmin,
};
