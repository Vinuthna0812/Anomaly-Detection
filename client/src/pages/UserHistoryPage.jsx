import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/UserHistoryPage.css";

export default function UserHistoryPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`https://anomaly-detection-production-7004.up.railway.app/api/admin/user/${userId}/history`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser({ name: res.data.name, email: res.data.email });
        setImages(res.data.images);
      })
      .catch((err) => console.error("Error loading user history:", err));
  }, [userId]);

  return (
    <div className="user-history-page">
      {user && (
        <div className="user-info">
          <h2>{user.name}'s History</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
      <div className="history-grid">
        {images.length === 0 ? (
          <p>No image history found.</p>
        ) : (
          // images.map((img, idx) => (
          //   <div key={idx} className="history-card">
          //     <img
          //       src={`http://localhost:8000${img.imageUrl}`}
          //       alt={`Upload ${idx}`}
          //     />
          //     <p><strong>Score:</strong> {img.anomalyScore}</p>
          //     <p><strong>Anomalous:</strong> {img.isAnomalous ? "Yes" : "No"}</p>
          //     <p><strong>Uploaded:</strong> {new Date(img.uploadedAt).toLocaleString()}</p>
          //   </div>
          // )
          images.map((img, idx) => (
  <div key={idx} className="history-card">
    <img
      src={`https://anomaly-detection-qgwh.onrender.com${img.imageUrl}`}
      alt={`Upload ${idx}`}
    />
    <p><strong>Confidence Score:</strong> {img.confidenceScore}</p>
    <p><strong>Category:</strong> {img.category}</p>
    <p><strong>Class:</strong> {img.predictedClass}</p>
    {/* <p><strong>Anomalous:</strong> {img.isAnomalous }</p> */}
    <p><strong>Uploaded:</strong> {new Date(img.uploadedAt).toLocaleString()}</p>
  </div>
))

          
        )}
      </div>
    </div>
  );
}
