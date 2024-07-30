const express = require('express');
const Appointment = require('../models/appointment');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.getAll();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new appointment
router.post('/', authenticateToken, async (req, res) => {
  const { clinic, date, time, reason, ticketNumber } = req.body;
  try {
    const appointment = await Appointment.create(req.user.id, clinic, date, time, reason, ticketNumber, req.user.email);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.getById(req.params.id);
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update appointment details
router.put('/:id', authenticateToken, async (req, res) => {
  const { clinic_id, date, time, reason, ticketNumber, status } = req.body;
  try {
    const appointment = await Appointment.update(req.params.id, clinic_id, date, time, reason, ticketNumber, status);
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update appointment status
router.put('/:id/status', authenticateToken, async (req, res) => {
  const { status } = req.body;
  try {
    const appointment = await Appointment.updateStatus(req.params.id, status);
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an appointment
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const appointment = await Appointment.delete(req.params.id);
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
