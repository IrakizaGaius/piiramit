const pool = require('../config/db');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const Appointment = {
  create: async (user_id, clinic, date, time, reason, ticketNumber, email, status = 'pending') => {
    const query = 'INSERT INTO appointments (user_id, clinic, date, time, reason, ticket_number, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [user_id, clinic, date, time, reason, ticketNumber, status];

    try {
      const result = await pool.query(query, values);
      const appointment = result.rows[0];

      // Send email confirmation after creating the appointment
      //await this.sendEmailConfirmation(appointment, email);

      return appointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error('Could not create appointment');
    }
  },

  getAll: async () => {
    const query = 'SELECT * FROM appointments';
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = 'SELECT * FROM appointments WHERE id = $1';
    const values = [id];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching appointment by ID:', error);
      throw new Error('Could not fetch appointment');
    }
  },

  updateStatus: async (id, status) => {
    const query = 'UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *';
    const values = [status, id];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw new Error('Could not update appointment status');
    }
  },

  delete: async (id) => {
    const query = 'DELETE FROM appointments WHERE id = $1 RETURNING *';
    const values = [id];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw new Error('Could not delete appointment');
    }
  },

  /*sendEmailConfirmation: async (appointment, email) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Appointment Confirmation',
      text: `Your appointment is scheduled for ${appointment.date} at ${appointment.time}. Reason: ${appointment.reason}. Ticket Number: ${appointment.ticket_number}.`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent:', appointment);
    } catch (error) {
      console.error('Email sending error:', error);
    }
  }*/
};

module.exports = Appointment;
