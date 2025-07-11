const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function getDateAndTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const date = `${year}-${month}-${day}`;
  const time = `${hours}:${minutes}:${seconds}`;

  return { date, time };
}

app.post('/api/rating', async (req, res) => {
  const { Rating, Feedback } = req.body;

  if (!Rating || !Feedback) {
    return res.status(400).json({ error: 'Missing rating or feedback.' });
  }

  const { date, time } = getDateAndTime();
  const scriptURL = process.env.RATING_SHEET_URL;

  try {
    await axios.post(
      scriptURL,
      new URLSearchParams({ Rating, Feedback, Date: date, Time: time }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.status(200).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Feedback submit error:', error.message);
    res.status(500).json({ error: 'Failed to submit feedback.', detail: error.message });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const { date, time } = getDateAndTime();
  const scriptURL = process.env.CONTACT_US_URL;

  try {
    await axios.post(
      scriptURL,
      new URLSearchParams({
        Name: name,
        Email: email,
        Given_message: message,
        Date: date,
        Time: time
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.status(200).json({ message: 'Message submitted successfully.' });
  } catch (error) {
    console.error('Contact form submit error:', error.message);
    res.status(500).json({ error: 'Failed to submit message.', detail: error.message });
  }
});

app.get('/api/nasa', async (req, res) => {
  const apiKey = process.env.NASA_API_KEY;
  const { type, date } = req.query;

  try {
    let url = '';

    switch (type) {
      case 'apod':
        url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${date ? `&date=${date}` : ''}`;
        break;

      case 'mars':
        url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;
        const marsResponse = await axios.get(url);
        const photos = marsResponse.data.photos.map(photo => ({
          ...photo,
          img_src: photo.img_src.replace('http://', 'https://')
        }));
        return res.json({ photos });

      case 'epic':
        if (date) {
          // Use custom date endpoint for EPIC
          url = `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${apiKey}`;
        } else {
          // Default to latest images if no date
          url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`;
        }
        break;

      case 'neo': {
        const today = new Date().toISOString().split('T')[0];
        url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`;
        break;
      }

      case 'nasa_image': {
        const q = req.query.q || 'moon';
        const media_type = req.query.media_type || 'image';
        const searchUrl = `https://images-api.nasa.gov/search?q=${q}&media_type=${media_type}`;

        const searchRes = await axios.get(searchUrl);
        const items = searchRes.data.collection?.items?.slice(0, 3);

        // For video/audio, fetch the real asset URLs
        if (media_type === 'video' || media_type === 'audio') {
          const enrichedItems = await Promise.all(items.map(async (item) => {
            const nasa_id = item.data?.[0]?.nasa_id;
            const assetRes = await axios.get(`https://images-api.nasa.gov/asset/${nasa_id}`);
            const actualUrls = assetRes.data.collection.items;

            return {
              ...item,
              actualAssets: actualUrls,
            };
          }));

          return res.json({ collection: { items: enrichedItems } });
        }

        return res.json(searchRes.data);
      }

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

// Uncomment the following lines to test the backend server directly
//if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 NASA API server running at http://localhost:${PORT}`);
  });
//}

module.exports = app;