const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendSignupEmail = (to, username) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Welcome to Piir Amit Healthcare App!',
    html: `<p>Hello ${username},</p>
           <p>Thank you for signing up for our Healthcare App. You can login using the following link:</p>
           <a href="http://localhost:3000/login.html">Login to your account</a>
           <p>Best regards,</p>
           <p>Piir Amit Healthcare Team</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendSignupEmail };
