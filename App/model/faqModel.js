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

  }
)


let faqModel = mongoose.model("faq", faqSchema)

module.exports = faqModel