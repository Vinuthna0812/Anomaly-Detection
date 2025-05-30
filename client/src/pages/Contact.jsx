import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    try {
      const response = await fetch('https://anomaly-detection-qgwh.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setStatus(data.message);
      setFormData({ name: '', email: '', message: '' }); // Clear form on success
    } catch (error) {
      setStatus('Error sending message. Try again.');
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Have any questions or need support? Feel free to reach out to us.</p>

      <div className="contact-info">
        <p><strong>Email:</strong> support@screwguard.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Address:</strong> 123 Industrial Road, Hyderabad, India</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

        <label>Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Type your message here..." rows="4" required></textarea>

        <button type="submit">Send Message</button>
      </form>

      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default Contact;
