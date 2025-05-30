// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");

// const authRoutes = require("./routes/authRoutes");

// const app = express();
// const imageRoutes = require("./models/image.js");
// app.use("/api/images", imageRoutes);

// // Database Connection
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
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
// const path = require("path");

// // Serve static files from the 'uploads' folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.use("/api/auth", authRoutes);
// const Feedback = require("./models/feedback"); // Import Feedback model

// // Submit Feedback
// app.post("/api/submit-feedback", async (req, res) => {
//   const { feedbackText } = req.body;

//   if (!feedbackText) {
//     return res.status(400).json({ message: "Feedback cannot be empty" });
//   }

//   try {
//     const newFeedback = new Feedback({ feedbackText });
//     await newFeedback.save();
//     res.status(201).json({ message: "Feedback submitted successfully!" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error submitting feedback", error: error.message });
//   }
// });

// // Fetch all feedback
// app.get("/api/feedbacks", async (req, res) => {
//   try {
//     const feedbacks = await Feedback.find();
//     res.status(200).json(feedbacks);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching feedbacks", error: error.message });
//   }
// });

// const Contact = require("./models/contact"); // Import the Contact model

// // Contact API Endpoint
// app.post("/api/contact", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
//     const newContact = new Contact({ name, email, message });
//     await newContact.save();
//     res.status(201).json({ message: "Message sent successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to send message" });
//   }
// });
// const Review = require("./models/reviews");
// // Reviews API Endpoints
// app.post("/api/reviews", async (req, res) => {
//   try {
//     const { name, rating, comment } = req.body;
//     const newReview = new Review({ name, rating, comment });
//     await newReview.save();
//     res.status(201).json({ message: "Review submitted successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to submit review" });
//   }
// });

// app.get("/api/reviews", async (req, res) => {
//   try {
//     const reviews = await Review.find().sort({ submittedAt: -1 });
//     res.status(200).json(reviews);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch reviews" });
//   }
// });

// const port = process.env.PORT || 8000;
// app.listen(port, () =>
//   console.log(`🚀 Server running on http://localhost:${port}`)
// );
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminContactRoutes = require("./routes/adminContact");


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    //credentials: true,
    origin:
     // "http://localhost:5173", 
      "https://anomaly-detection-xi.vercel.app"
    ,
    credentials: true,
  })
);

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/contacts", adminContactRoutes);
// Feedback, contact, reviews, image, etc. (as you already had)
const Feedback = require("./models/feedback");
const Contact = require("./models/contact");
const Review = require("./models/reviews");

app.post("/api/submit-feedback", async (req, res) => {
  const { feedbackText } = req.body;
  if (!feedbackText) return res.status(400).json({ message: "Feedback cannot be empty" });

  try {
    const newFeedback = new Feedback({ feedbackText });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error submitting feedback", error: err.message });
  }
});

app.get("/api/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedbacks", error: err.message });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.post("/api/reviews", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    const newReview = new Review({ name, rating, comment });
    await newReview.save();
    res.status(201).json({ message: "Review submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit review" });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ submittedAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Database Connected."))
  .catch((err) => console.error("❌ Database Connection Failed:", err));
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
const PORT = process.env.PORT || 8080; // Change from 8000 to 8080
app.listen(PORT, '0.0.0.0', () => {  // Add '0.0.0.0'
  console.log(`🚀 Server running on ${PORT}`);
});