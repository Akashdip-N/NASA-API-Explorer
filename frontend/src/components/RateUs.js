import { useState, useRef } from 'react';
import '../css_file/RateUs.css';

function RateUs() {
  // PORT number to connect to the backend server
  const PORT = 4000;
  const API_URL = `http://localhost:${PORT}`;

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${API_URL}/api/rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        Rating: rating,
        Feedback: feedback,
      }).toString(),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.error('Error submitting feedback:', err);
        alert('🚫 Error code 222! Please go through the README file to fix the issue. 🚫');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='rate-us-container'>
      <div className="rateus-container" id="rateus">
        {!submitted ? (
          <>
            <h2>Rate Your Experience</h2>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${hovered >= star || rating >= star ? 'filled' : ''}`}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(star)}
                  name=''
                >
                  ★
                </span>
              ))}
            </div>

            <form ref={formRef} onSubmit={handleSubmit} name="submit-to-google-sheet" className="feedback-form">
              <textarea
                placeholder="Share your suggestions or feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                name="Feedback"
              ></textarea>
              <button className="button" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Submit Feedback'}
              </button>
            </form>
          </>
        ) : (
          <p className="thank-you-msg">⭐️ Thanks for your feedback! ⭐️</p>
        )}
      </div>
    </div>
  );
}

export default RateUs;