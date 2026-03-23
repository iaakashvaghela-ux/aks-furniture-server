const { default: mongoose } = require("mongoose");


const subSubCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please fill the value"],
      match: [/^[a-zA-Z ]{2,20}$/, "please fill correct value"]
    },
    image: String,
    parentCategory: {
      type: String,
      ref: "category"
    },
    subCategory: {
      type: String,
      ref: "subCategory"
    },

    order: {
      type: Number,
      required: true,
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


let subSubCategoryModel = mongoose.model("subSubCategory", subSubCategorySchema)

module.exports = subSubCategoryModel