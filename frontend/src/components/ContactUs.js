import React, { useState } from 'react';
import '../css_file/ContactUs.css';

function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch('http://localhost:4000/api/contact', {
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
        alert('Something went wrong. Please try again later.');
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
          <p className='contactus-message'>Have questions, feedback, or just want to say hello? We’d love to hear from you.</p>
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
              placeholder="Your Message"
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
