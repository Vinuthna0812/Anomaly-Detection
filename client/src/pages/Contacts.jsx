import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://anomaly-detection-qgwh.onrender.com/api/admin/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContacts(response.data);
      } catch (error) {
        console.error("Failed to fetch contacts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div className="contacts-page">Loading contacts...</div>;

  return (
    <div className="contacts-page">
      <h2 className="contacts-title">All Contact Messages</h2>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <div className="contacts-list">
          {contacts.map((contact) => (
            <div key={contact._id} className="contact-card">
              <p><strong>Name:</strong> {contact.name}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Message:</strong> {contact.message}</p>
              <p className="contact-timestamp">
                Submitted At: {new Date(contact.submittedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;
