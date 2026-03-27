const { default: mongoose } = require("mongoose");


const countrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please fil the value"],

    },
    order: {
      type: Number,
      required: [true, "country order number required"],
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


let countryModel = mongoose.model("country", countrySchema)

module.exports = countryModel