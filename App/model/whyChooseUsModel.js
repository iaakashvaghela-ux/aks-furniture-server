const mongoose = require("mongoose");

const whyChooseUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "whyChooseUs title is required"]
  },
  description: String,
  order: {
    type: Number,
    required: [true, "whyChooseUs order number is required"],
  },
  image: {
    type: String,
    required: [true, "whyChooseUs image is required"]
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
  }
);

const whyChooseUsModel = mongoose.model("whyChooseUs", whyChooseUsSchema);

module.exports = whyChooseUsModel;

