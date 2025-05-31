// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const fs = require("fs");
// const path = require("path");
// const axios = require("axios");
// const FormData = require("form-data");
// const User = require("../models/user");
// const { comparePassword, hashPassword } = require("../utils/auth");

// // ✅ Test route
// const test = (req, res) => {
//   res.json({ message: "✅ Auth route is working!" });
// };

// // ✅ Register user
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ error: "All fields are required" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ error: "Email already in use" });

//     const hashedPassword = await hashPassword(password);
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       imageUrl: "",
//     });

//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res
//       .cookie("token", token, { httpOnly: true, sameSite: "strict" })
//       .status(201)
//       .json({
//         success: true,
//         user: {
//           id: newUser._id,
//           name: newUser.name,
//           email: newUser.email,
//           imageUrl: newUser.imageUrl,
//         },
//         token,
//       });
//   } catch (error) {
//     console.error("❌ Registration Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // ✅ Login user
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ error: "Email and password required" });

//     const user = await User.findOne({ email });
//     if (!user || !(await comparePassword(password, user.password)))
//       return res.status(400).json({ error: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.cookie("token", token, { httpOnly: true, sameSite: "strict" }).json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         imageUrl: user.imageUrl,
//       },
//       token,
//     });
//   } catch (error) {
//     console.error("❌ Login Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // ✅ Get profile (with inline token verification)
// const getProfile = async (req, res) => {
//   const { token } = req.cookies;
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
//     if (err) return res.status(403).json({ error: "Invalid token" });

//     try {
//       const user = await User.findById(decoded.id).select("-password");
//       if (!user) return res.status(404).json({ error: "User not found" });

//       res.json(user);
//     } catch (err) {
//       console.error("❌ Error fetching profile:", err);
//       res.status(500).json({ error: "Failed to fetch user profile" });
//     }
//   });
// };


// const uploadImage = async (req, res) => {
//   try {
//     const { userId, category } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: "No image file uploaded" });
//     }
//     if (!category) {
//       return res.status(400).json({ error: "Category not provided" });
//     }
//     if (!userId) {
//       return res.status(400).json({ error: "User ID not provided" });
//     }
//     // console.log("📦 req.file:", req.file);
//     const {
//       fieldname,
//       originalname,
//       mimetype,
//       size,
//       path: filePath,
//     } = req.file;
//     console.log("📦 req.file:", {
//       fieldname,
//       originalname,
//       mimetype,
//       size,
//       filePath,
//     });

//     // Ensure uploads folder exists
//     const uploadsDir = path.join(__dirname, "../uploads");
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }

//     // Save file buffer to uploads folder with unique filename
//     // Using timestamp to avoid overwrites
//     // const uniqueFilename = `${Date.now()}_${req.file.originalname}`;
//     // const savedFilePath = path.join(uploadsDir, uniqueFilename);
//     // fs.writeFileSync(savedFilePath, req.file.buffer);
//     const savedFilePath = req.file.path;
//     const uniqueFilename = req.file.filename;
//     console.log("✅ File saved at:", savedFilePath);
//     // const result = await model.predict(savedFilePath); // or whatever you're doing

//     // Prepare form data to send to Flask API
//     const formData = new FormData();
//     formData.append("file", fs.createReadStream(savedFilePath));
//     formData.append("category", category);

//     // Send image and category to Flask server
//     const flaskRes = await axios.post(
//       "http://localhost:5001/predict",
//       formData,
//       {
//         headers: formData.getHeaders(),
//       }
//     );

//     const { is_anomalous, error, confidence, predicted_class } = flaskRes.data;

//     // Create new image entry for user document in Mongo
//     // const newImageEntry = {
//     //   imageUrl: `/uploads/${uniqueFilename}`, // this is relative URL for frontend
//     //   anomalyScore: error,
//     //   isAnomalous: is_anomalous,
//     //   uploadedAt: new Date(),
//     // };
//     const newImageEntry = {
//       imageUrl: `/uploads/${uniqueFilename}`,
//       isAnomalous: is_anomalous,
//       category, // ✅ save category from req.body
//       predictedClass: predicted_class, // ✅ from Flask response
//       confidenceScore: confidence, // ✅ from Flask response
//       uploadedAt: new Date(),
//     };

//     // Save image info in user's images array
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { $push: { images: newImageEntry } },
//       { new: true }
//     ).select("-password");

//     // Return combined info to client
//     res.status(200).json({
//       is_anomalous,
//       error,
//       confidence,
//       predicted_class,
//       imageUrl: newImageEntry.imageUrl,
//       mongo_save: true,
//       user,
//     });
//   } catch (error) {
//     console.error("❌ Upload Error:", error.message || error);
//     res.status(500).json({ error: "Image upload failed" });
//   }
// };
// // exports.uploadImage = async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ message: "No file uploaded" });
// //     }

// //     console.log("File received:", req.file.originalname);

// //     // send to Flask...
// //   } catch (err) {
// //     console.error("Upload failed:", err.message);
// //     res.status(500).json({ message: "Internal Server Error", error: err.message });
// //   }
// // };

// module.exports = {
//   test,
//   registerUser,
//   loginUser,
//   getProfile,
//   uploadImage,
// };
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const User = require("../models/user");
const { comparePassword, hashPassword } = require("../utils/auth");

// ✅ Test route
const test = (req, res) => {
  res.json({ message: "✅ Auth route is working!" });
};

// ✅ Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      imageUrl: "",
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, { httpOnly: true, secure: true,        // REQUIRED for https and cross-site
    sameSite: "None",  })
      .status(201)
      .json({
        success: true,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          imageUrl: newUser.imageUrl,
        },
        token,
      });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user || !(await comparePassword(password, user.password)))
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, { httpOnly: true, secure: true,        // REQUIRED for https and cross-site
    sameSite: "None",  }).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
      },
      token,
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get profile (with inline token verification)
const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    try {
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(404).json({ error: "User not found" });

      res.json(user);
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  });
};


// const uploadImage = async (req, res) => {
//   try {
//     const { userId, category } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: "No image file uploaded" });
//     }
//     if (!category) {
//       return res.status(400).json({ error: "Category not provided" });
//     }
//     if (!userId) {
//       return res.status(400).json({ error: "User ID not provided" });
//     }
//     // console.log("📦 req.file:", req.file);
//     const {
//       fieldname,
//       originalname,
//       mimetype,
//       size,
//       path: filePath,
//     } = req.file;
//     console.log("📦 req.file:", {
//       fieldname,
//       originalname,
//       mimetype,
//       size,
//       filePath,
//     });

//     // Ensure uploads folder exists
//     const uploadsDir = path.join(__dirname, "../uploads");
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }

//     // Save file buffer to uploads folder with unique filename
//     // Using timestamp to avoid overwrites
//     // const uniqueFilename = `${Date.now()}_${req.file.originalname}`;
//     // const savedFilePath = path.join(uploadsDir, uniqueFilename);
//     // fs.writeFileSync(savedFilePath, req.file.buffer);
//     const savedFilePath = req.file.path;
//     const uniqueFilename = req.file.filename;
//     console.log("✅ File saved at:", savedFilePath);
//     // const result = await model.predict(savedFilePath); // or whatever you're doing

//     // Prepare form data to send to Flask API
//     const formData = new FormData();
//     formData.append("file", fs.createReadStream(savedFilePath));
//     formData.append("category", category);

//     // Send image and category to Flask server
//     const flaskRes = await axios.post(
//       "http://localhost:5001/predict",
//       formData,
//       {
//         headers: formData.getHeaders(),
//       }
//     );

//     const { is_anomalous, error, confidence, predicted_class } = flaskRes.data;

//     // Create new image entry for user document in Mongo
//     // const newImageEntry = {
//     //   imageUrl: `/uploads/${uniqueFilename}`, // this is relative URL for frontend
//     //   anomalyScore: error,
//     //   isAnomalous: is_anomalous,
//     //   uploadedAt: new Date(),
//     // };
//     const newImageEntry = {
//       imageUrl: `/uploads/${uniqueFilename}`,
//       isAnomalous: is_anomalous,
//       category, // ✅ save category from req.body
//       predictedClass: predicted_class, // ✅ from Flask response
//       confidenceScore: confidence, // ✅ from Flask response
//       uploadedAt: new Date(),
//     };

//     // Save image info in user's images array
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { $push: { images: newImageEntry } },
//       { new: true }
//     ).select("-password");

//     // Return combined info to client
//     res.status(200).json({
//       is_anomalous,
//       error,
//       confidence,
//       predicted_class,
//       imageUrl: newImageEntry.imageUrl,
//       mongo_save: true,
//       user,
//     });
//   } catch (error) {
//     console.error("❌ Upload Error:", error.message || error);
//     res.status(500).json({ error: "Image upload failed" });
//   }
// };
const uploadImage = async (req, res) => {
  const { userId } = req.body;
  const imageBuffer = fs.readFileSync(req.file.path);

  const newImage = {
    data: imageBuffer,
    contentType: req.file.mimetype,
    uploadedAt: new Date()
  };

  const user = await User.findById(userId);
  user.images.push({ image: newImage }); // Assuming schema allows it
  await user.save();

  res.json({ message: 'Image uploaded', user });
};
// const uploadImage = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: "No image file uploaded" });
//     }

//     if (!userId) {
//       return res.status(400).json({ error: "User ID not provided" });
//     }

//     // Read the image file
//     const imageBuffer = fs.readFileSync(req.file.path);

//     const newImage = {
//       image: {
//         data: imageBuffer,
//         contentType: req.file.mimetype,
//       },
//       uploadedAt: new Date(),
//     };

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     user.images.push(newImage); // Assumes schema matches
//     await user.save();

//     res.status(200).json({ message: "Image uploaded", user });
//   } catch (error) {
//     console.error("❌ Upload Error:", error.message || error);
//     res.status(500).json({ error: "Image upload failed" });
//   }
// };

// exports.uploadImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     console.log("File received:", req.file.originalname);

//     // send to Flask...
//   } catch (err) {
//     console.error("Upload failed:", err.message);
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// };

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  uploadImage,
};