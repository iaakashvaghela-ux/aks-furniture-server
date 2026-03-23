const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Slider title is required"]
  },
  subHeading: String,
  order: {
    type: Number,
    required: [true, "Slider order number is required"],
  },
  image: {
    type: String,
    required: [true, "Slider image is required"]
  },
  link: String,
  slug: {
    type: String,
    required: [true, "Slider slug is required"]
  },
  status: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  deleted_at: {
    type: Date,
    default: null
  }
}, { timestamps: true });

const sliderModel = mongoose.model("slider", sliderSchema);

module.exports = sliderModel;

