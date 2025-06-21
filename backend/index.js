const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/api/nasa', async (req, res) => {
  const apiKey = process.env.NASA_API_KEY;
  const { type, date } = req.query;

  try {
    let url = '';

    switch (type) {
      case 'apod':
        url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${date?`&date=${date}`:''}`;
        break;

      case 'mars':
        url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;
        break;

      case 'epic':
        url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`;
        break;

      case 'neo': {
        const today = new Date().toISOString().split('T')[0];
        url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`;
        break;
      }

      case 'nasa_image':
        url = `https://images-api.nasa.gov/search?q=moon`;
        break;

      default:
        return res.status(400).json({ error: 'Invalid or unsupported API type.' });
    }

    const response = await axios.get(url);
    res.json(response.data || { message: 'No data returned from NASA.' });

  } catch (err) {
    console.error('NASA API error:', err.message);
    res.status(500).json({
      error: 'Error code 111! Please go through the README file to fix the issue.',
      detail: err.message || 'Something went wrong in the backend.'
    });
  }
});


//if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 NASA API server running at http://localhost:${PORT}`);
  });
//}

// Export for testing
module.exports = app;