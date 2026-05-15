const categoryModel = require("../../model/categoryModel");
const productModel = require("../../model/productModel");
const colorModel = require("../../model/colorModel");

let getProductColor = async (req, res) => {
    try {
        const colors = await colorModel.find({
          status: true,
          deleted_at: null
        }).sort({ order: 1 });
        res.status(200).json({ success: true, data: colors });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

let webProductView = async (req, res) => {
  try {
    const { category, colors, maxPrice } = req.query;
    let filter = {
      status: true,
      deleted_at: null
    }

    if (category && category !== "All") {
      filter.parentCategory = category;
    }

    if (colors) {
      const colorIds = colors.split(",").filter(Boolean);
      if (colorIds.length) {
        filter.color = { $in: colorIds };
      }
    }

    if (maxPrice) {
      filter.salePrice = { $lte: Number(maxPrice) };
    }

    let products = await productModel.find(filter).populate(["parentCategory", "subCategory", "subSubCategory", "color"]);
    res.status(200).json({ _status: true, _data: products, path: process.env.BASE_URL + "uploads/product/" });
  } catch (error) {
    res.status(500).json({ _status: false, _message: error.message });
  }
}

let webSingleProduct = async (req, res) => {
  try {
    let filter = {
      slug: req.params.slug,
      status: true,
      deleted_at: null
    }
    let product = await productModel.findOne(filter).populate(["parentCategory", "subCategory", "subSubCategory", "color"]);
    res.status(200).json({ _status: true, _data: product, path: process.env.BASE_URL + "uploads/product/" });
  } catch (error) {
    res.status(500).json({ _status: false, _message: error.message });
  }
}


let categoryView = async (req, res) => {
  try {
    let filter = {
      status: true,
      deleted_at: null
    }
    let category = await categoryModel.find(filter);
    res.status(200).json({ _status: true, _data: category });
  } catch (error) {
    res.status(500).json({ _status: false, _message: error.message });
  }
}
module.exports = { webProductView, webSingleProduct, categoryView, getProductColor };



