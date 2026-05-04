// const Booking = require('../models/Booking');
// const Service = require('../models/Service');
// const Notification = require('../models/Notification');

// // @desc    Create booking
// // @route   POST /api/bookings
// exports.createBooking = async (req, res) => {
//   try {
//     const { serviceId, problemDescription, address, preferredDate, preferredTime } = req.body;

//     const service = await Service.findById(serviceId);
//     if (!service) {
//       return res.status(404).json({ status: 'error', message: 'Service not found' });
//     }

//     const booking = await Booking.create({
//       user: req.user.id,
//       service: serviceId,
//       serviceName: service.name,
//       problemDescription,
//       address,
//       preferredDate: new Date(preferredDate),
//       preferredTime,
//       price: service.startingPrice
//     });

//     // Create notification
//     await Notification.create({
//       user: req.user.id,
//       title: 'Booking Confirmed',
//       message: `Your ${service.name} service request has been submitted successfully.`,
//       type: 'booking_created',
//       relatedId: booking._id
//     });

//     res.status(201).json({
//       status: 'success',
//       data: { booking }
//     });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// };

// // @desc    Get user bookings
// // @route   GET /api/bookings
// exports.getMyBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ user: req.user.id })
//       .populate('service', 'name icon image')
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       status: 'success',
//       count: bookings.length,
//       data: { bookings }
//     });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// };

// // @desc    Get single booking
// // @route   GET /api/bookings/:id
// exports.getBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findOne({
//       _id: req.params.id,
//       user: req.user.id
//     }).populate('service', 'name icon image startingPrice visitCharge');

//     if (!booking) {
//       return res.status(404).json({ status: 'error', message: 'Booking not found' });
//     }

//     res.status(200).json({
//       status: 'success',
//       data: { booking }
//     });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// };

// // @desc    Cancel booking
// // @route   PATCH /api/bookings/:id/cancel
// exports.cancelBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findOneAndUpdate(
//       { _id: req.params.id, user: req.user.id, status: { $in: ['pending', 'assigned'] } },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true }
//     );

//     if (!booking) {
//       return res.status(400).json({ status: 'error', message: 'Cannot cancel this booking' });
//     }

//     await Notification.create({
//       user: req.user.id,
//       title: 'Booking Cancelled',
//       message: `Your ${booking.serviceName} booking has been cancelled.`,
//       type: 'status_update',
//       relatedId: booking._id
//     });

//     res.status(200).json({
//       status: 'success',
//       data: { booking }
//     });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// };

// // @desc    Rate booking
// // @route   PATCH /api/bookings/:id/rate
// exports.rateBooking = async (req, res) => {
//   try {
//     const { rating, review } = req.body;
    
//     const booking = await Booking.findOneAndUpdate(
//       { _id: req.params.id, user: req.user.id, status: 'completed' },
//       { rating, review },
//       { new: true }
//     );

//     if (!booking) {
//       return res.status(400).json({ status: 'error', message: 'Cannot rate this booking' });
//     }

//     res.status(200).json({
//       status: 'success',
//       data: { booking }
//     });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// };


const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Notification = require('../models/Notification');

// @desc    Create booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { serviceId, problemDescription, address, preferredDate, preferredTime } = req.body;

    console.log('Creating booking for user:', req.user.id);
    console.log('Service ID:', serviceId);

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Service not found' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      service: serviceId,
      serviceName: service.name,
      problemDescription,
      address,
      preferredDate: new Date(preferredDate),
      preferredTime,
      price: service.startingPrice
    });

    console.log('Booking created:', booking._id);

    // Create notification
    await Notification.create({
      user: req.user.id,
      title: 'Booking Confirmed',
      message: `Your ${service.name} service request has been submitted successfully.`,
      type: 'booking_created',
      relatedId: booking._id
    });

    res.status(201).json({
      status: 'success',
      message: 'Booking created successfully',
      data: { booking }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings
exports.getMyBookings = async (req, res) => {
  try {
    console.log('Fetching bookings for user:', req.user.id);
    
    const bookings = await Booking.find({ user: req.user.id })
      .populate('service', 'name icon image')
      .sort({ createdAt: -1 });

    console.log('Found bookings:', bookings.length);
    bookings.forEach(b => {
      console.log(`  - ${b.serviceName} | ${b.status} | ${b._id}`);
    });

    res.status(200).json({
      status: 'success',
      count: bookings.length,
      data: { bookings }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('service', 'name icon image startingPrice visitCharge');

    if (!booking) {
      return res.status(404).json({ status: 'error', message: 'Booking not found' });
    }

    res.status(200).json({
      status: 'success',
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Cancel booking
// @route   PATCH /api/bookings/:id/cancel
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id, status: { $in: ['pending', 'assigned'] } },
      { status: 'cancelled', cancelledAt: new Date() },
      { new: true }
    );

    if (!booking) {
      return res.status(400).json({ status: 'error', message: 'Cannot cancel this booking' });
    }

    await Notification.create({
      user: req.user.id,
      title: 'Booking Cancelled',
      message: `Your ${booking.serviceName} booking has been cancelled.`,
      type: 'status_update',
      relatedId: booking._id
    });

    res.status(200).json({
      status: 'success',
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Rate booking
// @route   PATCH /api/bookings/:id/rate
exports.rateBooking = async (req, res) => {
  try {
    const { rating, review } = req.body;
    
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id, status: 'completed' },
      { rating, review },
      { new: true }
    );

    if (!booking) {
      return res.status(400).json({ status: 'error', message: 'Cannot rate this booking' });
    }

    res.status(200).json({
      status: 'success',
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};