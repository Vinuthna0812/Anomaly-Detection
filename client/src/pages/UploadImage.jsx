import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UploadImage.css';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [userId, setUserId] = useState(""); // Replace with actual user ID logic
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const res = await axios.get("https://anomaly-detection-qgwh.onrender.com/api/auth/profile", {
        withCredentials: true,
      });
      setUserId(res.data._id);
      setImageUrls(res.data.user.images.map((img) => img.imageUrl));
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchUserData();
}, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
//     if (loading || !image || !userId){ console.log("🧪 image:", image);
// console.log("🧪 userId:", userId);
// return alert("Please select image and ensure user is logged in.");} 

if (!image) return alert("Please select an image.");
if (!userId) return alert("User not loaded. Try refreshing or logging in again.");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("userId", userId);
    try {
      const res = await axios.post("https://anomaly-detection-qgwh.onrender.com/api/auth/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Image uploaded!");
      //setImageUrls(res.data.user.imageUrls);
      setImageUrls(res.data.user.images.map(img => img.imageUrl));
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} required />
        <button type="submit">Upload</button>
      </form>
      <h2>Your Image History</h2>
      <div className="image-gallery">
        {imageUrls.map((url, index) => (
          <img key={index} src={`https://anomaly-detection-qgwh.onrender.com${url}`} alt={`upload-${index}`} className="uploaded-image" />
        ))}
      </div>
    </div>
  );
};

export default UploadImage;