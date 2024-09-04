const datasetDao = require('../daos/dataset');

const createDataset = async (req, res) => {
  const { name, categoryId } = req.body;
  const dataset = await datasetDao.createDataset({ name, categoryId });
  return res.send({ dataset });
};

const updateDataset = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId, status } = req.body;
  const dataset = await datasetDao.updateDatasetById(id, {
    name,
    categoryId,
    status,
  });
  return res.send({ dataset });
};

const getDatasets = async (req, res) => {
  const { search, fields, offset, limit, sort } = req.query;
  const query = {};

  query.query = {};
  if (search) query.search = search;
  if (fields) query.fields = fields.split(',');
  if (offset) query.offset = parseInt(offset, 10);
  if (limit) query.limit = parseInt(limit, 10);
  if (sort) query.sort = sort.split(',');

  Object.keys(req.query)
    .filter(
      (q) => ['search', 'fields', 'offset', 'limit', 'sort'].indexOf(q) === -1,
    )
    .forEach((q) => {
      query.query[q] = ['true', 'false'].includes(req.query[q])
        ? JSON.parse(req.query[q])
        : req.query[q];
    });

  const { datasets, total } = await datasetDao.findDatasets(query);

  return res.send({ datasets, total });
};

module.exports = { createDataset, updateDataset, getDatasets };
