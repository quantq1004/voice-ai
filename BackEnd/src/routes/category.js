const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const categoryController = require('../controllers/category');
const { auth, hasRole } = require('../middlewares/auth');
const {
  createCategoryValidate,
  updateCategoryValidate,
  createDatasetValidate,
} = require('../validations/category');

/* eslint-disable prettier/prettier */
router.post('/categories', auth, createCategoryValidate, asyncMiddleware(categoryController.createCategory));
router.put('/categories/:id', auth, updateCategoryValidate, asyncMiddleware(categoryController.updateCategory));
router.delete('/categories/:id', auth, asyncMiddleware(categoryController.deleteCategory));
router.get('/categories', auth, asyncMiddleware(categoryController.getCategories));
router.post('/categories/:id/datasets', createDatasetValidate, auth, asyncMiddleware(categoryController.createDataset));
router.get('/categories/:id/datasets', auth, asyncMiddleware(categoryController.getDatasets));
router.get('/categories/:categoryId/datasets/:datasetId/sentences', auth, asyncMiddleware(categoryController.getSentences));
router.get('/admin/categories', auth, hasRole('manage-voices-cloning'), asyncMiddleware(categoryController.getCategoriesForAdmin));
router.get('/admin/categories/:id', auth, hasRole('manage-voices-cloning'), asyncMiddleware(categoryController.getCategoryById));
/* eslint-enable prettier/prettier */

module.exports = router;
