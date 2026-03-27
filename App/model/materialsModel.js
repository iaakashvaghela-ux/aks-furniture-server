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
    deleted_at: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
  }
)


let materialsModel = mongoose.model("materials", materialsSchema)

module.exports = materialsModel