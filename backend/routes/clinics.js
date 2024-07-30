const express = require('express');
const axios = require('axios');
const router = express.Router();

async function fetchClinicsFromGooglePlaces(state, city) {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: `clinics in ${city}, ${state}`,
        key: apiKey
      }
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching clinics from Google Places API: ' + error.message);
  }
}

// Route to get real-time clinics
router.get('/real-time', async (req, res) => {
  const { state, city } = req.query;
  try {
    // Fetch clinics from Google Places API
    const clinics = await fetchClinicsFromGooglePlaces(state, city);
    res.json(clinics);
  } catch (err) {
    console.error('Error fetching real-time clinics:', err);  // Log the error
    res.status(500).json({ error: 'Failed to fetch real-time clinics' });
  }
});

module.exports = router;
