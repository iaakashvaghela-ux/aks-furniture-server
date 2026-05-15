const categoryModel = require("../../model/categoryModel");
const sliderModel = require("../../model/sliderModel");
const subCategoryModel = require("../../model/subCategoryModel");
const subSubCategoryModel = require("../../model/subSubCategoryModel");

let webSlider = async (req, res) => {
  try {
    let filter = {
      status: true,
      deleted_at: null
    }
    let slider = await sliderModel.find(filter);
    res.status(200).json({ _status: true, _data: slider, path: process.env.BASE_URL + "uploads/slider/" });
  } catch (error) {
    res.status(500).json({ _status: false, _message: error.message });
  }
}

let webCollectionMenu = async (req, res) => {
  try {
    const filter = {
      status: true,
      deleted_at: null
    };

    const [categories, subCategories, subSubCategories] = await Promise.all([
      categoryModel.find(filter).sort({ order: 1 }).lean(),
      subCategoryModel.find(filter).sort({ order: 1 }).lean(),
      subSubCategoryModel.find(filter).sort({ order: 1 }).lean()
    ]);

    const subSubBySubCategory = subSubCategories.reduce((grouped, item) => {
      const key = String(item.subCategory);
      grouped[key] = grouped[key] || [];
      grouped[key].push(item);
      return grouped;
    }, {});

    const subByCategory = subCategories.reduce((grouped, item) => {
      const key = String(item.parentCategory);
      grouped[key] = grouped[key] || [];
      grouped[key].push({
        ...item,
        children: subSubBySubCategory[String(item._id)] || []
      });
      return grouped;
    }, {});

    const menu = categories.map((category) => ({
      ...category,
      children: subByCategory[String(category._id)] || []
    }));

    res.status(200).json({ _status: true, _data: menu });
  } catch (error) {
    res.status(500).json({ _status: false, _message: error.message });
  }
}




module.exports = { webSlider, webCollectionMenu }; 
