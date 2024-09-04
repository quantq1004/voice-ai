const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const datasetController = require('../controllers/dataset');
const { auth } = require('../middlewares/auth');
const {
  createDatasetValidate,
  updateDatasetValidate,
} = require('../validations/dataset');

/* eslint-disable prettier/prettier */
router.post('/datasets', auth, createDatasetValidate, asyncMiddleware(datasetController.createDataset));
router.put('/datasets/:id', auth, updateDatasetValidate, asyncMiddleware(datasetController.updateDataset));
router.get('/datasets', auth, asyncMiddleware(datasetController.getDatasets));
/* eslint-enable prettier/prettier */

module.exports = router;
