// // // // // const express=require('express');
// // // // // const dotenv=require('dotenv').config()
// // // // // const cors=require('cors')
// // // // // const {mongoose}=require('mongoose')
// // // // // const cookieParser= require('cookie-parser')
// // // // // const app=express();

// // // // // //database connection
// // // // // mongoose.connect(process.env.MONGO_URL)
// // // // // .then(()=>console.log("Database Connected."))
// // // // // .catch((err)=> console.log("Database not Connected.",err))

// // // // // //Middleware
// // // // // app.use(express.json())
// // // // // app.use(cookieParser());
// // // // // app.use(express.urlencoded({extended:false}))

// // // // // app.use('/',require('./routes/authRoutes'))

// // // // // const port=8000;
// // // // // app.listen(port,()=> console.log(`Server is running on port ${port}`))
// // // // require('dotenv').config();

// // // // const express = require('express');
// // // // const dotenv = require('dotenv').config();
// // // // const cors = require('cors');
// // // // const mongoose = require('mongoose');
// // // // const cookieParser = require('cookie-parser');

// // // // const app = express();

// // // // // Database Connection
// // // // mongoose
// // // //   .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// // // //   .then(() => console.log('Database Connected.'))
// // // //   .catch((err) => console.error('Database Connection Error:', err));

// // // // // Middleware
// // // // app.use(express.json());
// // // // app.use(cookieParser());
// // // // app.use(express.urlencoded({ extended: false }));

// // // // // Routes
// // // // app.use('/', require('./routes/authRoutes'));

// // // // const PORT = process.env.PORT || 8000;
// // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // // const express = require('express');
// // // require('dotenv').config();  // Ensure this is at the top
// // // const cors = require('cors');
// // // const mongoose = require('mongoose');
// // // const cookieParser = require('cookie-parser');

// // // const app = express();

// // // // Database connection
// // // mongoose.connect(process.env.MONGO_URL)
// // //   .then(() => console.log("Database Connected."))
// // //   .catch((err) => console.log("Database not Connected.", err));

// // // // Middleware
// // // app.use(express.json());
// // // app.use(cookieParser());
// // // app.use(express.urlencoded({ extended: false }));

// // // // Routes
// // // app.use('/', require('./routes/authRoutes'));

// // // const port = process.env.PORT || 8000;
// // // app.listen(port, () => console.log(`Server is running on port ${port}`));
// // const express = require('express');
// // require('dotenv').config();  // Ensure this is at the top
// // const cors = require('cors');
// // const mongoose = require('mongoose');
// // const cookieParser = require('cookie-parser');

// // const app = express();

// // // Database connection
// // mongoose.connect(process.env.MONGO_URL)
// //   .then(() => console.log("Database Connected."))
// //   .catch((err) => console.log("Database not Connected.", err));

// // // Middleware
// // app.use(express.json());
// // app.use(cookieParser());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // Fix CORS for cookies

// // // Routes
// // app.use('/', require('./routes/authRoutes'));

// // const port = process.env.PORT || 8000;
// // app.listen(port, () => console.log(`Server is running on port ${port}`));
// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");

// const authRoutes = require("./routes/authRoutes");

// const app = express();

// // Database Connection
// mongoose
//   .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ Database Connected."))
//   .catch((err) => console.error("❌ Database Connection Failed:", err));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

// // Routes
// app.use("/", authRoutes);

// const Feedback = require('./models/feedback'); // Import Feedback model

// // Submit Feedback
// app.post('/api/submit-feedback', async (req, res) => {
//   const { feedbackText, rating } = req.body;

//   if (!feedbackText || rating < 1 || rating > 5) {
//     return res.status(400).json({ message: 'Invalid feedback input' });
//   }

//   try {
//     const newFeedback = new Feedback({ feedbackText, rating });
//     await newFeedback.save();
//     res.status(201).json({ message: 'Feedback submitted successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error submitting feedback', error: error.message });
//   }
// });

// // Fetch all feedback
// app.get('/api/feedbacks', async (req, res) => {
//   try {
//     const feedbacks = await Feedback.find();
//     res.status(200).json(feedbacks);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching feedbacks', error: error.message });
//   }
// });

// // Contact API Endpoint
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
//     const newContact = new Contact({ name, email, message });
//     await newContact.save();
//     res.status(201).json({ message: 'Message sent successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to send message' });
//   }
// });

// // Reviews API Endpoints
// app.post('/api/reviews', async (req, res) => {
//   try {
//     const { name, rating, comment } = req.body;
//     const newReview = new Review({ name, rating, comment });
//     await newReview.save();
//     res.status(201).json({ message: 'Review submitted successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to submit review' });
//   }
// });

// app.get('/api/reviews', async (req, res) => {
//   try {
//     const reviews = await Review.find().sort({ submittedAt: -1 });
//     res.status(200).json(reviews);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch reviews' });
//   }
// });

// const port = process.env.PORT || 8000;
// app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Database Connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Database Connected."))
  .catch((err) => console.error("❌ Database Connection Failed:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Routes
app.use("/api/auth", authRoutes);
const Feedback = require('./models/feedback'); // Import Feedback model

// Submit Feedback
app.post('/api/submit-feedback', async (req, res) => {
  const { feedbackText } = req.body;

  if (!feedbackText) {
    return res.status(400).json({ message: 'Feedback cannot be empty' });
  }

  try {
    const newFeedback = new Feedback({ feedbackText });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
});

// Fetch all feedback
app.get('/api/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error: error.message });
  }
});

const Contact = require('./models/contact'); // Import the Contact model

// Contact API Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});
const Review = require('./models/reviews');
// Reviews API Endpoints
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    const newReview = new Review({ name, rating, comment });
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ submittedAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
  
