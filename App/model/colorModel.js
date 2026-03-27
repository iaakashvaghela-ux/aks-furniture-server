const { default: mongoose } = require("mongoose");


const colorSchema = mongoose.Schema(
  {
    colorName: {
      type: String,
      required: [true, "please fil the value"],
      match: [/^[a-zA-Z ]{2,15}$/, "please fill correct value"]

    },
    code: {
      type: String,
      required: [true, "please fill code"]
    },
    order: {
      type: Number,
      required: true,
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


let colorModel = mongoose.model("color", colorSchema)

module.exports = colorModel