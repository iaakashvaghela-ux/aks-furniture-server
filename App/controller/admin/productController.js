const { createSlug } = require("../../config/helper")
const categoryModel = require("../../model/categoryModel")
const colorModel = require("../../model/colorModel")
const materialsModel = require("../../model/materialsModel")
const productModel = require("../../model/productModel")
const subCategoryModel = require("../../model/subCategoryModel")
const subSubCategoryModel = require("../../model/subSubCategoryModel")


let productCreate = async (req, res) => {
  let { productName } = req.body
  let slug = createSlug(productName);

  try {
    let sameProductName = await productModel.findOne({
      slug: { $regex: `^${slug.trim()}$`, $options: "i" },
      deleted_at: null
    })
    if (sameProductName) {
      let obj = {
        _status: false,
        _message: "same product name already exist"
      }
      res.send(obj)
    } else {
      let data = {
        ...req.body,
        parentCategory: req.body.parentCategory || null,
        subCategory: req.body.subCategory || null,
        subSubCategory: req.body.subSubCategory || null,
        material: Array.isArray(req.body.material) ? req.body.material : (req.body.material ? [req.body.material] : []),
        color: Array.isArray(req.body.color) ? req.body.color : (req.body.color ? [req.body.color] : []),
        slug,
        productImage: req.files.productImage ? req.files.productImage[0].filename : null,
        backImage: req.files.backImage ? req.files.backImage[0].filename : null,
        galleryImage: req.files.galleryImage ? req.files.galleryImage.map(file => file.filename) : []
      }


      await productModel.create(data)
      let obj = {
        _status: true,
        _message: "product added"
      }
      res.send(obj)
    }
  } catch (err) {
    let errors = []
    for (const key in err.errors) {
      const loopObj = {}
      loopObj[key] = err.errors[key].message
      errors.push(loopObj)
    }
    let obj = {
      _status: false,
      // _message: err,
      errors
    }
    res.send(obj)

    console.log(err);
  }
}

let productView = async (req, res) => {
  try {
    let _data = await productModel.find({
      deleted_at: null,
      status: true
    }).populate(['parentCategory', 'subCategory', 'subSubCategory', 'material', 'color'])
    let obj = {
      _status: true,
      _message: "product View",
      _data
    }
    res.send(obj)
  } catch (err) {
    let obj = {
      _status: false,
      _message: err
    }
    res.send(obj)
  }
}
let getSingleProduct = async (req, res) => {
  let { id } = req.params;
  let filter = {
    _id: id,
    deleted_at: null,
    status: true
  }
  let _data = await productModel.findOne(filter).populate(['parentCategory', 'subCategory', 'subSubCategory', 'material', 'color'])
  let obj = {
    _status: true,
    _message: "product View",
    _data
  }
  res.send(obj)
}
let getParentCategory = async (req, res) => {
  let filter = {
    deleted_at: null,
    status: true
  }
  let _data = await categoryModel.find(filter).select(['name', 'status'])
  let obj = {
    _status: true,
    _message: "category View",
    _data
  }
  res.send(obj)
}


let getSubCategory = async (req, res) => {
  let { id } = req.params;
  let filter = {
    parentCategory: id,
    deleted_at: null,
    status: true
  }

  let _data = await subCategoryModel.find(filter).select(['name', 'status'])
  let obj = {
    _status: true,
    _message: " sub category View",
    _data
  }
  res.send(obj)
}


let getSubSubCategory = async (req, res) => {
  let { id } = req.params;
  let filter = {
    subCategory: id,
    deleted_at: null,
    status: true
  }

  let _data = await subSubCategoryModel.find(filter).select(['name', 'status'])
  let obj = {
    _status: true,
    _message: " sub sub category View",
    _data
  }
  res.send(obj)
}

let getMaterial = async (req, res) => {
  let filter = {
    deleted_at: null,
    status: true
  }
  let _data = await materialsModel.find(filter).select(['name', 'status'])
  let obj = {
    _status: true,
    _message: "materials View",
   _data
  }
  res.send(obj)
}

let getColor = async (req, res) => {
  let filter = {
    deleted_at: null,
    status: true
  }
  let _data = await colorModel.find(filter).select(['colorName', 'status'])
  let obj = {
    _status: true,
    _message: "color View",
    _data
  }
  res.send(obj)
}

let productUpdate = async (req, res) => {
  let { id } = req.params;
  let { productName } = req.body
  let slug = createSlug(productName);

  try {
    let sameProductName = await productModel.findOne({
      slug: { $regex: `^${slug.trim()}$`, $options: "i" },
      deleted_at: null,
      _id: { $ne: id }
    })
    if (sameProductName) {
      let obj = {
        _status: false,
        _message: "same product name already exist"
      }
      res.send(obj)
    } else {
      let data = {
        ...req.body,
        parentCategory: req.body.parentCategory || null,
        subCategory: req.body.subCategory || null,
        subSubCategory: req.body.subSubCategory || null,
        material: Array.isArray(req.body.material) ? req.body.material : (req.body.material ? [req.body.material] : []),
        color: Array.isArray(req.body.color) ? req.body.color : (req.body.color ? [req.body.color] : []),
        slug,
        productImage: req.files.productImage ? req.files.productImage[0].filename : null,
        backImage: req.files.backImage ? req.files.backImage[0].filename : null,
        galleryImage: req.files.galleryImage ? req.files.galleryImage.map(file => file.filename) : []
      }


      await productModel.findByIdAndUpdate(id, data)
      let obj = {
        _status: true,
        _message: "product updated"
      }
      res.send(obj)
    }
  } catch (err) {
    let errors = []
    for (const key in err.errors) {
      const loopObj = {}
      loopObj[key] = err.errors[key].message
      errors.push(loopObj)
    }
    let obj = {
      _status: false,
      // _message: err,
      errors
    }
    res.send(obj)

    console.log(err);
  }
}
module.exports = {
  getParentCategory,
  getSubCategory,
  getSubSubCategory,
  getMaterial,
  getColor,
  productCreate,
  productView,
  getSingleProduct,
  productUpdate
}
