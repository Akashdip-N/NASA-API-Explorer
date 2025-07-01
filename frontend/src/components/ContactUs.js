import React, { useState } from 'react';
import '../css_file/ContactUs.css';

function ContactUs() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name: form.name,
        email: form.email,
        message: form.message,
      }).toString(),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        console.error('Error submitting contact form:', err);
        alert('🚫 Error code 222! Please go through the README file to fix the issue. 🚫');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="contact-container" id='contact_us'>
      {!submitted ? (
        <>
          <h1>📬 Contact Us</h1>
          <p className='contactus-message'>Have questions or need help? Just send us a message using this form—we’ll get back to you as soon as possible! 😄</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message you want to send us"
              value={form.message}
              onChange={handleChange}
              rows="5"
              required
            />
            <button type="submit" className="button" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </>
      ) : (
        <p className="success-message">✅ Message Sent! We’ll get back to you soon.</p>
      )}
    </div>
  );
}

export default ContactUs;