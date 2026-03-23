const { default: mongoose } = require("mongoose");


const materialsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please fil the value"],

    },
    order: {
      type: Number,
      required: [true,"matirials order number required"],
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


let materialsModel = mongoose.model("materials", materialsSchema)

module.exports = materialsModel