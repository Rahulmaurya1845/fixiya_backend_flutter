// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// exports.sendEmail = async (to, subject, text) => {
//   const mailOptions = {
//     from: `"Fixiya" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text,
//     html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
//       <h2 style="color: #0D7377;">Fixiya</h2>
//       <p>${text}</p>
//       <p style="color: #666; font-size: 12px;">This OTP will expire in 10 minutes.</p>
//     </div>`
//   };

//   await transporter.sendMail(mailOptions);
// };




const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

exports.sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: `"Fixiya" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: `<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: 0 auto;">
      <h2 style="color: #0D7377; text-align: center;">Fixiya</h2>
      <hr style="border: 1px solid #0D7377;">
      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 16px; color: #333;">${text}</p>
      <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <p style="margin: 0; color: #666; font-size: 14px;">Your One-Time Password (OTP)</p>
      </div>
      <p style="color: #666; font-size: 12px; text-align: center;">This OTP will expire in 10 minutes. Do not share it with anyone.</p>
      <p style="color: #999; font-size: 11px; text-align: center; margin-top: 30px;">Fixiya Home Services</p>
    </div>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};