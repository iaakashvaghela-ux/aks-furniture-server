const { default: mongoose } = require("mongoose");


const faqSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "please fil the value"],

    },
    answer: {
      type: String,
      required: [true, "please fil the value"],

    },
    order: {
      type: Number,
      required: [true, "faq order number required"],
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
    timestamps: true,
  }
)


let faqModel = mongoose.model("faq", faqSchema)

module.exports = faqModel