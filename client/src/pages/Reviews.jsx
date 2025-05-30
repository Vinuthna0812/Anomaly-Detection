// import React, { useState } from 'react';
// import '../styles/Reviews.css';

// const Reviews = () => {
//   const [reviews, setReviews] = useState([
//     { id: 1, name: 'Alice', rating: 5, comment: 'Great service! Highly recommended.' },
//     { id: 2, name: 'Bob', rating: 4, comment: 'Good experience, but there’s room for improvement.' },
//     { id: 3, name: 'Charlie', rating: 5, comment: 'Exceptional quality and service!' },
//   ]);

//   const [newReview, setNewReview] = useState({ name: '', rating: '', comment: '' });
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newReview.name && newReview.rating && newReview.comment) {
//       setReviews([...reviews, { id: reviews.length + 1, ...newReview }]);
//       setSubmitted(true);
//       setTimeout(() => setSubmitted(false), 3000);
//       setNewReview({ name: '', rating: '', comment: '' });
//     }
//   };

//   return (
//     <div className="reviews-container">
//       <h1>Customer Reviews</h1>
      
//       <div className="reviews-list">
//         {reviews.map((review) => (
//           <div key={review.id} className="review">
//             <h3>{review.name}</h3>
//             <p className="rating">⭐ {review.rating}/5</p>
//             <p>{review.comment}</p>
//           </div>
//         ))}
//       </div>

//       <div className="review-form">
//         <h2>Leave a Review</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={newReview.name}
//             onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
//             required
//           />
//           <select
//             value={newReview.rating}
//             onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
//             required
//           >
//             <option value="">Select Rating</option>
//             <option value="5">5 - Excellent</option>
//             <option value="4">4 - Good</option>
//             <option value="3">3 - Average</option>
//             <option value="2">2 - Poor</option>
//             <option value="1">1 - Bad</option>
//           </select>
//           <textarea
//             placeholder="Write your review..."
//             value={newReview.comment}
//             onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//             required
//           ></textarea>
//           <button type="submit">Submit Review</button>
//         </form>
//         {submitted && <p className="success-message">Thank you for your review! 🎉</p>}
//       </div>
//     </div>
//   );
// };

// export default Reviews;
import React, { useState, useEffect } from 'react';
import '../styles/Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching reviews:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.rating || !newReview.comment) return;

    try {
      const response = await fetch('https://anomaly-detection-qgwh.onrender.com/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });
      const data = await response.json();
      setReviews([...reviews, data]);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setNewReview({ name: '', rating: '', comment: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="reviews-container">
      <h1>Customer Reviews</h1>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review._id} className="review">
            <h3>{review.name}</h3>
            <p className="rating">⭐ {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <div className="review-form">
        <h2>Leave a Review</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} required />
          <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })} required>
            <option value="">Select Rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Bad</option>
          </select>
          <textarea placeholder="Write your review..." value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} required></textarea>
          <button type="submit">Submit Review</button>
        </form>
        {submitted && <p className="success-message">Thank you for your review! 🎉</p>}
      </div>
    </div>
  );
};

export default Reviews;
