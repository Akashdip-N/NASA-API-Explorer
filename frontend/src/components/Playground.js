import React, { useState, useEffect, use } from 'react';
import '../css_file/Playground.css';


const apiOptions = [
  { value: 'apod', label: 'Astronomy Picture of the Day' },
  { value: 'mars', label: 'Mars Rover Photos' },
  { value: 'epic', label: 'Earth Polychromatic Imaging Camera (EPIC)' },
  { value: 'neo', label: 'Near Earth Object Web Service (NeoWs)' },
  { value: 'nasa_image', label: 'NASA Image and Video Library' },
];

const apiDetails = {
  apod: {
    description: 'This will show the Astronomy Picture of the Day, along with explanations, images or videos shared by NASA each day.',
    link: 'https://api.nasa.gov/#apod',
  },
  mars: {
    description: 'This will show all the explored images taken by the Mars rovers, like Curiosity and Opportunity, based on Earth date.',
    link: 'https://api.nasa.gov/#mars-rover-photos',
  },
  epic: {
    description: 'This will show the stunning images of Earth taken by the EPIC camera onboard the NOAA DSCOVR satellite, for yesterday or earlier dates.',
    link: 'https://epic.gsfc.nasa.gov/about/',
  },
  neo: {
    description: 'This will track all the Near-Earth Objects (NEOs) and will show its information on asteroids close to Earth on this specific day.',
    link: 'https://api.nasa.gov/#neo-rest',
  },
  nasa_image: {
    description: 'Here you can search in NASA’s vast image and video library for space-related media including photos, audio, and more.',
    link: 'https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf',
  },
};

function Playground({ darkMode }) {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedYesterday = yesterday.toISOString().split('T')[0];
  console.log(formattedYesterday);

  const [type, setType] = useState('');
  const [params, setParams] = useState({ date: today });
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [marsCount, setMarsCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submittedParams, setSubmittedParams] = useState({});
  const [submittedMarsCount, setSubmittedMarsCount] = useState(1);
  const [submittedMediaType, setSubmittedMediaType] = useState('image');

  const getDayEmoji = (dateStr) => {
    const day = new Date(dateStr).getDay();
    const emojis = ['🌙', '☀️', '🚀', '🛰️', '🌌', '🌠', '🌍'];
    return emojis[day];
  };

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const fetchData = () => {
    // PORT number to connect to the backend server
    const PORT = 4000;
    const API_URL = `http://localhost:${PORT}`;

    const timeout = 5000;
    setLoading(true);
    setError('');
    setData(null);
    setSubmitted(true);
    setSubmittedParams({ ...params });
    setSubmittedMarsCount(marsCount);
    setSubmittedMediaType(mediaType);

    const queryParams = { type, ...params };

    if (type === 'nasa_image' && !searchQuery.trim()) {
      setError('🚫 Please enter a keyword before searching the NASA Library. 🚫');
      setLoading(false);
      return;
    }

    if (type === 'nasa_image') {
      queryParams.q = searchQuery.trim();
      queryParams.media_type = submittedMediaType;
      setSubmittedQuery(searchQuery.trim());
    }

    if (type === 'nasa_image') {
      queryParams.q = searchQuery;
      queryParams.media_type = mediaType;
    }

    if (type === 'mars') {
      queryParams.mars_count = marsCount;
    }

    const query = new URLSearchParams(queryParams).toString();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    fetch(`${API_URL}/api/nasa?${query}`, { signal: controller.signal })
      .then(async (res) => {
        clearTimeout(timer);
        const result = await res.json();
        if (!res.ok) throw new Error(result?.error || 'Unexpected backend error');
        setData(result);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          setError('🛑 Backend is down, please wait for 1 min and try again later 🛑');
        } else {
          setError(err.message.includes('Failed to fetch')
            ? '🚫 Error code 222! Please go through the README file to fix the issue. 🚫'
            : `⚠️ ${err.message} ⚠️`);
        }
      })
      .finally(() => setLoading(false));
  };


  const renderResult = () => {
    if (!data) return null;

    switch (type) {
      case 'apod':
        return (
          <div className="card">
            <h2>{data.title}</h2>
            {data.media_type === 'image' ? (
              <img src={data.url} alt={data.title} className="image" />
            ) : (
              <iframe title="apod-video" width="100%" height="400" src={data.url} allowFullScreen />
            )}
            <p style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{data.explanation}</p>
            {data.hdurl && (
              <p>🔗 <a href={data.hdurl} target="_blank" rel="noopener noreferrer">View HD Image</a></p>
            )}
            <p>{getDayEmoji(data.date)} Date: {data.date}</p>
            {data.copyright && <p>© <em>{data.copyright}</em></p>}
          </div>
        );

      case 'mars':
        return (
          <div>
            <h2>Mars Rover Photos</h2>
            {data.photos?.slice(0, submittedMarsCount).map(photo => (
              <div key={photo.id} className="card">
                <img src={photo.img_src} alt="Mars" className="image" />
                <p>📅 {photo.earth_date} — 📷 {photo.camera.full_name}</p>
              </div>
            ))}
          </div>
        );

      case 'epic':
        return (
          <div>
            <h2>EPIC Earth Images</h2>
            {data?.length === 0 ? (
              <p className="error">🛑 No data available for the selected date. Please select another date. 🛑</p>
            ) : (
              data?.slice(0, 3).map(item => {
                const imgUrl = `https://epic.gsfc.nasa.gov/archive/natural/${item.date
                  .split(' ')[0]
                  .replace(/-/g, '/')}/png/${item.image}.png`;
                return (
                  <div key={item.identifier} className="card">
                    <p>{item.caption}</p>
                    <img src={imgUrl} alt={item.caption} className="image" />
                  </div>
                );
              })
            )}
          </div>
        );

      case 'neo': {
        const objects = Object.values(data.near_earth_objects)[0];
        return (
          <div className="card">
            <h2>Near-Earth Objects (Today)</h2>
            {objects?.slice(0, 3).map(obj => (
              <p key={obj.id}>
                ☄️ <strong>{obj.name}</strong> — Speed: {Math.round(obj.close_approach_data[0].relative_velocity.kilometers_per_hour)} km/h
              </p>
            ))}
          </div>
        );
      }

      case 'nasa_image':
        return (
          <div>
            <h2>Search Results for the query: {submittedQuery}</h2>
            {data?.collection?.items?.length === 0 ? (
              <p className="error">🛑 No media found for the given keyword. Please try another search term or select another file type.</p>
            ) : (
              data?.collection?.items?.map((item, idx) => {
                const title = item.data?.[0]?.title;
                const description = item.data?.[0]?.description;
                const thumb = item.links?.[0]?.href;
                const assets = item.actualAssets;

                return (
                  <div key={idx} className="card">
                    <h3>{title}</h3>
                    {submittedMediaType === 'image' && <img src={thumb} alt={title} className="image" />}
                    {submittedMediaType === 'video' && assets?.length > 0 && (
                      <video controls width="100%">
                        <source src={assets.find(a => a.href.endsWith('.mp4'))?.href} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {submittedMediaType === 'audio' && assets?.length > 0 && (
                      <audio controls>
                        <source src={assets.find(a => a.href.endsWith('.mp3'))?.href} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                      </audio>
                    )}
                    <p>{description}</p>
                  </div>
                );
              })
            )}
          </div>
        );

      default:
        return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }
  };

  return (
    <div className='playground-div' id='playground'>
      <div className="playground">
        <div className="input-group">
          <strong className="message">Welcome to the Playground</strong>
          <label><strong>Select from one of the following API calls</strong></label>
          <select
            className="input"
            value={type}
            onChange={(e) => {
              const newType = e.target.value;
              setType(newType);
              setError('');

              // Set default params accordingly
              if (newType === 'apod') {
                setParams({ date: today });
              } else if (newType === 'epic') {
                setParams({ date: formattedYesterday });
              } else {
                setParams({});
              }

              setData(null);
            }}

          >
            <option value="" disabled>
              -- Select an API to explore --
            </option>
            {apiOptions.map(api => (
              <option key={api.value} value={api.value}>
                {api.label}
              </option>
            ))}
          </select>

          {type && (
            <>
              <h3 className="api-description-heading">API Description</h3>
              <div className="description">
                <p>{apiDetails[type].description}</p>
                <a href={apiDetails[type].link} target="_blank" rel="noopener noreferrer">
                  🔗 Learn more
                </a>
              </div>
            </>
          )}

          {(type === 'apod') && (
            <>
              <label className='date-label'>
                {type === 'apod'
                  ? '📅 Select a date for Astronomy Picture of the Day or continue with today’s date:'
                  : '🌍 Select a date for Earth imagery from EPIC camera or continue with today’s date:'}
              </label>
              <input
                type="date"
                name="date"
                value={params.date || today}
                onChange={handleChange}
                max={today}
                className="input"
              />
            </>
          )}

          {type === 'epic' && (
            <>
              <label className="date-label">
                🌍 Select a date for EPIC imagery (must be yesterday or earlier):
              </label>
              <input
                type="date"
                name="date"
                value={params.date || formattedYesterday}
                onChange={handleChange}
                max={formattedYesterday}
                className="input"
              />
            </>
          )}

          {type === 'mars' && (
            <>
              <label htmlFor="marsCount">
                <strong>Please use the slider to select the number of Images you want to see.</strong>
              </label>
              <input
                type="range"
                id="marsCount"
                className="slider_menu"
                min="1"
                max="20"
                value={marsCount}
                onChange={(e) => setMarsCount(Number(e.target.value))}
              />
              <p className='count_images'>Selected Mars Images: {marsCount}</p>
            </>
          )}

          {type === 'nasa_image' && (
            <>
              <label><strong>Choose Media Type:</strong></label>
              <select className="input" value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>

              <label><strong>Search NASA Library:</strong></label>
              <input
                type="text"
                className="input"
                placeholder="e.g., Moon, Earth, Apollo Mission..etc"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </>
          )}
        </div>

        {type && (
          <div className="button-wrapper">
            <button className="button" onClick={fetchData} disabled={loading}>
              {loading ? 'Fetching...' : 'See Results'}
            </button>
          </div>
        )}

        <div className="result-wrapper">
          <div className="result">
            {error && <p className="error">{error}</p>}
            {renderResult()}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Playground;