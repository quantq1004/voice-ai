const categoryDao = require('../daos/category');
const categoryService = require('../services/category');
const datasetDao = require('../daos/dataset');
const sentenceDao = require('../daos/sentence');

const createCategory = async (req, res) => {
  const { icon, name } = req.body;
  const category = await categoryDao.createCategory({ icon, name });
  return res.send({ category });
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { icon, name } = req.body;
  const category = await categoryDao.updateCategoryById(id, { icon, name });
  return res.send({ category });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await categoryDao.deleteCategory(id);
  return res.send({});
};

const getCategories = async (req, res) => {
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
  const { categories, total } = await categoryDao.findCategories(query);

  return res.send({ categories, total });
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await categoryDao.getCategoryById(id);
  return res.send({ category });
};

const createDataset = async (req, res) => {
  const { id: categoryId } = req.params;
  const { name, sentencesArray } = req.body;
  const dataset = await categoryService.createDataset({
    categoryId,
    name,
    sentencesArray,
  });
  return res.send({ dataset });
};

const getDatasets = async (req, res) => {
  const { search, searchFields, fields, offset, limit, sort } = req.query;
  const { id: categoryId } = req.params;
  const query = {};

  query.query = { categoryId };
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
  const { datasets, total } = await datasetDao.findDatasets(query);

  return res.send({ datasets, total });
};

const getSentences = async (req, res) => {
  const { search, searchFields, fields, offset, limit, sort } = req.query;

  const { datasetId } = req.params;
  const query = {};

  query.query = { datasetId };
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
  const { sentences, total } = await sentenceDao.findSentences(query);

  return res.send({ sentences, total });
};

const getCategoriesForAdmin = async (req, res) => {
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
  const { categories, total } = await categoryDao.findCategoriesForAdmin(query);

  return res.send({ categories, total });
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  createDataset,
  getDatasets,
  getSentences,
  getCategoriesForAdmin,
};
