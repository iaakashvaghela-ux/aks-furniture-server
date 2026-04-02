const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
    },
    subSubCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subSubCategory",
    },
    material: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "materials",
      }
    ],
    color: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "color",
      }
    ],
    productType: {
      type: String,
      enum: ["Featured", "New Arrivals", "Onsale", ""],
    },
    isTopRated: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    isBestSelling: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    isUpsell: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

    actualPrice: {
      type: Number,
      required: [true, "Actual price is required"],
    },
    salePrice: {
      type: Number,
      required: [true, "Sale price is required"],
    },
    stocks: {
      type: Number,
      required: [true, "Stock count is required"],
    },
    order: {
      type: Number,
      required: [true, "Display order is required"],
    },
    description: {
      type: String,
    },
    productImage: {
      type: String,
    },
    backImage: {
      type: String,
    },
    galleryImage: [
      {
        type: String,
      },
    ],
    slug: {
      type: String,
      required: [true, "Slug is required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

let productModel = mongoose.model("product", productSchema);

module.exports = productModel;

