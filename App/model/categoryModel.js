const { default: mongoose } = require("mongoose");


const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please fil the value"],
      match: [/^[a-zA-Z ]{2,15}$/, "please fill correct value"]

    },
    image: String,

    order: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true
    },
    slug: String,
    deleted_at: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
  }
)


let categoryModel = mongoose.model("category", categorySchema)

module.exports = categoryModel