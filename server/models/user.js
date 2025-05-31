// // const mongoose = require("mongoose");
// // const { Schema } = mongoose;

// // const userSchema = new Schema({
// //   name: String,
// //   email: {
// //     type: String,
// //     unique: true,
// //   },
// //   password: String,
// //   images: [
// //     {
// //       imageUrl: String,
// //       anomalyScore: Number,
// //       isAnomalous: Boolean,
// //       uploadedAt: { type: Date, default: Date.now },
// //     },
// //   ],
// // });

// // const UserModel = mongoose.model("User", userSchema);
// // module.exports = UserModel;
// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const userSchema = new Schema({
//   name: String,
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: String,
//   images: [
//     {
//       imageUrl: String,
//       isAnomalous: Boolean,
//       category: String, // 🆕 added category
//       predictedClass: String, // 🆕 added predicted class
//       confidenceScore: Number, // 🆕 added confidence score
//       uploadedAt: { type: Date, default: Date.now },
//     },
//   ],
// });

// const UserModel = mongoose.model("User", userSchema);
// module.exports = UserModel;
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    default: '',
  },
  result: {
    isAnomalous: { type: Boolean, default: false },
    defectClass: { type: String, default: null },
    predictedClass: { type: String, default: null },
    confidence: { type: Number, default: null },
    anomalyScore: { type: Number, default: null },
    localization: {
      type: [Object],
      default: [],
    }
  }
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  images: [ImageSchema],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
