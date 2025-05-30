// // // // import React, { useState } from 'react';
// // // // import '../styles/Feedback.css';

// // // // const Feedback = () => {
// // // //   const [feedback, setFeedback] = useState('');
// // // //   const [submitted, setSubmitted] = useState(false);

// // // //   const handleSubmit = (e) => {
// // // //     e.preventDefault();
// // // //     setSubmitted(true);
// // // //     setFeedback('');
// // // //   };

// // // //   return (
// // // //     <div className="feedback-container">
// // // //       <h1>Feedback</h1>
// // // //       <p>Your feedback helps us improve! Please share your thoughts below.</p>

// // // //       {!submitted ? (
// // // //         <form className="feedback-form" onSubmit={handleSubmit}>
// // // //           <label>Your Feedback</label>
// // // //           <textarea
// // // //             value={feedback}
// // // //             onChange={(e) => setFeedback(e.target.value)}
// // // //             placeholder="Type your feedback here..."
// // // //             rows="4"
// // // //             required
// // // //           ></textarea>

// // // //           <button type="submit">Submit</button>
// // // //         </form>
// // // //       ) : (
// // // //         <p className="success-message">Thank you for your feedback! 😊</p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Feedback;
// // // import React, { useState } from 'react';
// // // import '../styles/Feedback.css'; // Custom styles for the modal

// // // const Feedback= ({ onClose }) => {
// // //   const [feedback, setFeedback] = useState('');
// // //   const [rating, setRating] = useState(0);

// // //   const handleSubmit = async () => {
// // //     if (!feedback || rating === 0) {
// // //       alert('Please provide both feedback and a rating.');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch('http://localhost:8000/api/submit-feedback', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ feedbackText: feedback, rating }),
// // //       });
// // //       const data = await response.json();
// // //       alert(data.message || 'Feedback submitted successfully!');
// // //       onClose();
// // //     } catch (error) {
// // //       alert('Error submitting feedback: ' + error.message);
// // //     }
// // //   };

// // //   return (
// // //     <div className="feedback-modal">
// // //       <div className="modal-content">
// // //         <button className="close-button" onClick={onClose}>&times;</button>
// // //         <div className="inner-box">
// // //           <h2>We value your feedback</h2>
// // //           <textarea
// // //             placeholder="Write your feedback here..."
// // //             value={feedback}
// // //             onChange={(e) => setFeedback(e.target.value)}
// // //           />
// // //           <div className="rating">
// // //             {[...Array(5)].map((_, i) => (
// // //               <span
// // //                 key={i}
// // //                 className={`star ${i < rating ? 'selected' : ''}`}
// // //                 onClick={() => setRating(i + 1)}
// // //               >
// // //                 &#9733;
// // //               </span>
// // //             ))}
// // //           </div>
// // //           <div className="modal-actions">
// // //             <button className="btn btn-primary" onClick={handleSubmit}>
// // //               Submit
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Feedback;
// // import React, { useState } from 'react';
// // import '../styles/Feedback.css'; // Custom styles for the modal

// // const Feedback = () => {
// //   const [feedback, setFeedback] = useState('');

// //   const handleSubmit = async () => {
// //     if (!feedback.trim()) {
// //       alert('Please provide feedback.');
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://localhost:8000/api/submit-feedback', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ feedbackText: feedback }),
// //       });
// //       const data = await response.json();
// //       alert(data.message || 'Feedback submitted successfully!');
// //       setFeedback('');
// //     } catch (error) {
// //       alert('Error submitting feedback: ' + error.message);
// //     }
// //   };

// //   return (
// //     <div className="feedback-modal">
// //       <div className="modal-content">
// //         <div className="inner-box">
// //           <h2>We value your feedback</h2>
// //           <textarea
// //             placeholder="Write your feedback here..."
// //             value={feedback}
// //             onChange={(e) => setFeedback(e.target.value)}
// //           />
// //           <div className="modal-actions">
// //             <button className="btn btn-primary" onClick={handleSubmit}>
// //               Submit
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Feedback;
// import React, { useState } from 'react';
// import '../styles/Feedback.css'; // Updated styles

// const Feedback = () => {
//   const [feedback, setFeedback] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent page reload

//     if (!feedback.trim()) {
//       alert('Please provide feedback.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/submit-feedback', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ feedbackText: feedback }),
//       });
//       const data = await response.json();
//       alert(data.message || 'Feedback submitted successfully!');
//       setFeedback('');
//     } catch (error) {
//       alert('Error submitting feedback: ' + error.message);
//     }
//   };

//   return (
//     <div className="feedback-container">
//       <h1>We Value Your Feedback</h1>
//       <p>Your feedback helps us improve our services.</p>
      
//       <form className="feedback-form" onSubmit={handleSubmit}>
//         <label htmlFor="feedback">Your Feedback</label>
//         <textarea
//           id="feedback"
//           placeholder="Write your feedback here..."
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//         />
        
//         <button type="submit">Submit Feedback</button>
//       </form>
//     </div>
//   );
// };

// export default Feedback;
import React, { useState } from 'react';
import '../styles/Feedback.css'; // Ensure correct CSS path

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      alert('Please provide feedback.');
      return;
    }

    try {
      const response = await fetch('https://anomaly-detection-qgwh.onrender.com/api/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedbackText: feedback }),
      });

      const data = await response.json();
      alert(data.message || 'Feedback submitted successfully!');
      setFeedback('');
    } catch (error) {
      alert('Error submitting feedback: ' + error.message);
    }
  };

  return (
    <div className="feedback-container">
      <h1>We Value Your Feedback</h1>
      <p>Your feedback helps us improve our services.</p>
      
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label htmlFor="feedback">Your Feedback</label>
        <textarea
          id="feedback"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
