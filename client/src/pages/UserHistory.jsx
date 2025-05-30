import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import '../styles/UserHistory.css';

const UserHistory = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div className="user-history-container">Loading your history...</div>;
  if (!user) return <div className="user-history-container">Error: User not found. Please log in again.</div>;
  if (!user.images || !Array.isArray(user.images) || user.images.length === 0)
    return <div className="user-history-container">No history available.</div>;

  return (
    <div className="user-history-container">
      <h1 className="user-history-title">Your History</h1>
      <div className="user-history-grid">
        {/* {user.images.map((img, index) => (
          <div key={index} className="user-history-card">
            <img src={`http://localhost:8000${img.imageUrl}`} alt={`Uploaded ${index}`} />
            <p><strong>Anomaly Score:</strong> {img.anomalyScore}</p>
          </div>
        ))} */}
        {user.images.map((img, index) => (
  <div key={index} className="user-history-card">
    <img src={`https://anomaly-detection-qgwh.onrender.com${img.imageUrl}`} alt={`Uploaded ${index}`} />
    <p><strong>Category:</strong> {img.category}</p>
    <p><strong>Predicted Class:</strong> {img.predictedClass}</p>
    <p><strong>Confidence Score:</strong> {img.confidenceScore}</p>
  </div>
))}

      </div>
    </div>
  );
};

export default UserHistory;
