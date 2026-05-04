// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const { sendEmail } = require('../utils/sendOTP');

// // Generate JWT Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE || '7d'
//   });
// };

// // @desc    Send OTP to email
// // @route   POST /api/auth/send-otp
// exports.sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ status: 'error', message: 'Please provide an email' });
//     }

//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     // Find or create user
//     let user = await User.findOne({ email });
    
//     if (!user) {
//       user = await User.create({
//         email,
//         name: email.split('@')[0],
//         otp: { code: otp, expiresAt: otpExpires }
//       });
//     } else {
//       user.otp = { code: otp, expiresAt: otpExpires };
//       await user.save();
//     }

//     // Send OTP email (simplified - in production use a real email service)
//     try {
//       // await sendEmail(email, 'Your Fixiya OTP', `Your OTP is: ${otp}`);
//       console.log(`OTP for ${email}: ${otp}`);
//     } catch (emailError) {
//       console.error('Email sending failed:', emailError);
//     }

//     res.status(200).json({
//       status: 'success',
//       message: 'OTP sent successfully',
//       data: { email }
//     });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// };

// // @desc    Verify OTP
// // @route   POST /api/auth/verify-otp
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({ status: 'error', message: 'Please provide email and OTP' });
//     }

//     const user = await User.findOne({ email }).select('+otp');

//     if (!user) {
//       return res.status(404).json({ status: 'error', message: 'User not found' });
//     }

//     if (!user.otp || user.otp.code !== otp) {
//       return res.status(400).json({ status: 'error', message: 'Invalid OTP' });
//     }

//     if (new Date() > user.otp.expiresAt) {
//       return res.status(400).json({ status: 'error', message: 'OTP has expired' });
//     }

//     // Clear OTP and verify user
//     user.otp = undefined;
//     user.isVerified = true;
//     await user.save();

//     const token = generateToken(user._id);

//     res.status(200).json({
//       status: 'success',
//       message: 'OTP verified successfully',
//       data: {
//         token,
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           avatar: user.avatar
//         }
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// };

// // @desc    Get current user
// // @route   GET /api/auth/me
// exports.getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     res.status(200).json({
//       status: 'success',
//       data: { user }
//     });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// };

// // @desc    Update profile
// // @route   PUT /api/auth/profile
// exports.updateProfile = async (req, res) => {
//   try {
//     const { name, phone, addresses } = req.body;
    
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, phone, $addToSet: { addresses: { $each: addresses || [] } } },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json({
//       status: 'success',
//       data: { user }
//     });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// };


const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require('../utils/sendOTP');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @desc    Send OTP to email
// @route   POST /api/auth/send-otp
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ status: 'error', message: 'Please provide an email' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        email,
        name: email.split('@')[0],
        otp: { code: otp, expiresAt: otpExpires }
      });
    } else {
      user.otp = { code: otp, expiresAt: otpExpires };
      await user.save();
    }

    // Send OTP email to user
    try {
      await sendEmail(email, 'Your Fixiya OTP Code', `Your OTP code is: ${otp}`);
      console.log(`OTP sent to email: ${email}`);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to send OTP email. Please try again later.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully',
      data: { email }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ status: 'error', message: 'Please provide email and OTP' });
    }

    const user = await User.findOne({ email }).select('+otp');

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    if (!user.otp || user.otp.code !== otp) {
      return res.status(400).json({ status: 'error', message: 'Invalid OTP' });
    }

    if (new Date() > user.otp.expiresAt) {
      return res.status(400).json({ status: 'error', message: 'OTP has expired' });
    }

    // Clear OTP and verify user
    user.otp = undefined;
    user.isVerified = true;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      status: 'success',
      message: 'OTP verified successfully',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar
        }
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Update profile
// @route   PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, addresses } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, $addToSet: { addresses: { $each: addresses || [] } } },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};