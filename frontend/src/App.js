import React, { useState, useEffect } from 'react';
import './App.css';

const apiOptions = [
  { value: 'apod', label: 'Astronomy Picture of the Day' },
  { value: 'mars', label: 'Mars Rover Photos' },
  { value: 'epic', label: 'Earth Polychromatic Imaging Camera (EPIC)' },
  { value: 'neo', label: 'Near Earth Object Web Service (NeoWs)' },
  { value: 'nasa_image', label: 'NASA Image and Video Library' },
];

const today = new Date().toISOString().split('T')[0];

function App() {
  const [type, setType] = useState('apod');
  const [params, setParams] = useState({ date: today });
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const getDayEmoji = (dateStr) => {
    const day = new Date(dateStr).getDay(); // 0 = Sunday, 6 = Saturday
    const emojis = ['🌙', '🌞', '🚀', '🛰️', '🌌', '🌠', '🌍'];
    return emojis[day];
  };


  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const fetchData = () => {
    const PORT = 8000;

    setLoading(true);
    const query = new URLSearchParams({ type, ...params }).toString();

    fetch(`http://localhost:${PORT}/api/nasa?${query}`)
      .then(async (res) => {
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result?.error || 'Unexpected backend error');
        }
        setData(result);
        setError('');
      })
      .catch((err) => {
        setData(null);
        setError(
          err.message.includes('Failed to fetch')
            ? '🚫 Error code 222! Please go through the README file to fix the issue. 🚫'
            : `⚠️ ${err.message} ⚠️`
        );
      })
      .finally(() => setLoading(false));
  };

  const renderResult = () => {
    if (!data) return null;

    if (type === 'apod') {
      return (
        <div className="card">
          <h2>Title: {data.title}</h2>

          {data.media_type === 'image' ? (
            <img src={data.url} alt={data.title} className="image" />
          ) : (
            <iframe
              title="apod-video"
              width="100%"
              height="400"
              src={data.url}
              allowFullScreen
            ></iframe>
          )}

          <p style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
            {data.explanation}
          </p>

          {data.hdurl && (
            <p>
              🔗 <a href={data.hdurl} target="_blank" rel="noopener noreferrer">View Image in HD</a>
            </p>
          )}

          <p>{getDayEmoji(data.date)} Date: {data.date}</p>
          {data.copyright && (
            <p>© <em>{data.copyright}</em></p>
          )}
        </div>
      );
    }

    if (type === 'mars') {
      return (
        <div>
          <h2>Mars Rover Photos</h2>
          {data.photos?.slice(0, 3).map((photo) => (
            <div key={photo.id} className="card">
              <img src={photo.img_src} alt="Mars" className="image" />
              <p>
                📅 {photo.earth_date} — 📷 {photo.camera.full_name}
              </p>
            </div>
          ))}
        </div>
      );
    }

    if (type === 'epic') {
      return (
        <div>
          <h2>EPIC Earth Images</h2>
          {data?.slice(0, 3).map((item) => {
            const imgUrl = `https://epic.gsfc.nasa.gov/archive/natural/${item.date
              .split(' ')[0]
              .replace(/-/g, '/')}/png/${item.image}.png`;
            return (
              <div key={item.identifier} className="card">
                <p>{item.caption}</p>
                <img src={imgUrl} alt={item.caption} className="image" />
              </div>
            );
          })}
        </div>
      );
    }

    if (type === 'neo') {
      const objects = Object.values(data.near_earth_objects)[0];
      return (
        <div className="card">
          <h2>Near-Earth Objects (Today)</h2>
          {objects?.slice(0, 3).map((obj) => (
            <p key={obj.id}>
              ☄️ <strong>{obj.name}</strong> — Speed:{' '}
              {Math.round(obj.close_approach_data[0].relative_velocity.kilometers_per_hour)} km/h
            </p>
          ))}
        </div>
      );
    }

    if (type === 'nasa_image') {
      return (
        <div>
          <h2>NASA Image Search (Keyword: Moon)</h2>
          {data.collection?.items?.slice(0, 3).map((item, idx) => (
            <div key={idx} className="card">
              <img
                src={item.links?.[0]?.href}
                alt={item.data?.[0]?.title}
                className="image"
              />
              <p>{item.data?.[0]?.title}</p>
            </div>
          ))}
        </div>
      );
    }

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  };

  return (
    <div className="container">
      <div className="toggle-wrapper">
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
        <span className="toggle-label">{darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
      </div>


      <h1>🚀 NASA Data Explorer</h1>

      <div className="input-group">
        <label><strong>Choose from the following options</strong></label>
        <select
          className="input"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setParams(e.target.value === 'apod' ? { date: today } : {});
            setData(null);
          }}
        >
          {apiOptions.map((api) => (
            <option key={api.value} value={api.value}>
              {api.label}
            </option>
          ))}
        </select>

        {type === 'apod' && (
          <input
            type="date"
            name="date"
            value={params.date}
            onChange={handleChange}
            max={today}
            className="input"
          />
        )}
      </div>

      <div className="button-wrapper">
        <button
          className="button"
          onClick={fetchData}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'See Results'}
        </button>
      </div>

      <div className="result">
        {error && <p className="error">{error}</p>}
        {renderResult()}
      </div>
    </div>
  );
}

export default App;
