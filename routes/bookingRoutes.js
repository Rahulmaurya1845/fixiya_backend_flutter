const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createBooking,
  getMyBookings,
  getBooking,
  cancelBooking,
  rateBooking
} = require('../controllers/bookingController');

router.use(protect);

router.post('/', createBooking);
router.get('/', getMyBookings);
router.get('/:id', getBooking);
router.patch('/:id/cancel', cancelBooking);
router.patch('/:id/rate', rateBooking);

module.exports = router;