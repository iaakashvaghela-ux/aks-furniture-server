const mongoose = require("mongoose");

const testimonialsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "testimonials name is required"]
  },
  designation: String,
  order: {
    type: Number,
    required: [true, "testimonials order number is required"],
  },
  rating: {
    type: Number,
    required: [true, "testimonials rating is required"],
  },
  message: {
    type: String,
    required: [true, "testimonials message is required"],
  },
  image: {
    type: String,
    required: [true, "testimonials image is required"]
  },
  status: {
    type: Boolean,
    default: true
  },
  deleted_at: {
    type: Date,
    default: null
  }
},
  {
    timestamps: true
  });

const testimonialsModel = mongoose.model("testimonials", testimonialsSchema);

module.exports = testimonialsModel;

