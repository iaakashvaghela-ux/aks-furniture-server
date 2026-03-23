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


let categoryModel = mongoose.model("category", categorySchema)

module.exports = categoryModel