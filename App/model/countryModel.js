const { default: mongoose } = require("mongoose");


const countrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please fil the value"],

    },
    order: {
      type: Number,
      required: [true,"country order number required"],
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


let countryModel = mongoose.model("country", countrySchema)

module.exports = countryModel