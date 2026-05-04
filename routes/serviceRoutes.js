const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllServices,
  getService,
  getCategories,
  createService
} = require('../controllers/serviceController');

router.get('/', getAllServices);
router.get('/categories', getCategories);
router.get('/:id', getService);
router.post('/', protect, createService);

module.exports = router;