const categoryModel = require("../../model/categoryModel")
const colorModel = require("../../model/colorModel")
const materialsModel = require("../../model/materialsModel")
const subCategoryModel = require("../../model/subCategoryModel")
const subSubCategoryModel = require("../../model/subSubCategoryModel")

let getParentCategory = async (req, res) => {
  let filter = {
    deleted_at: null,
    status: true
  }
  let data = await categoryModel.find(filter).select(['name', 'status'])
  let obj = {
    _status: true,
    _message: "category View",
    data
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

  let data = await subCategoryModel.find(filter).select(['name', 'status'])
  let obj = {
    _status: true,
    _message: " sub category View",
    data
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

  let data = await subSubCategoryModel.find(filter).select(['name', 'status'])
  let obj = {
    _status: true,
    _message: " sub sub category View",
    data
  }
  res.send(obj)
}

let getMaterial = async (req, res) => {
  let filter = {
    deleted_at: null,
    status: true
  }
  let data = await materialsModel.find(filter).select(['name', 'status'])
  let obj = {
    _status: true,
    _message: "materials View",
    data
  }
  res.send(obj)
}

let getColor = async (req, res) => {
  let filter = {
    deleted_at: null,
    status: true
  }
  let data = await colorModel.find(filter).select(['name', 'status'])
  let obj = {
    _status: true,
    _message: "color View",
    data
  }
  res.send(obj)
}

module.exports = {
  getParentCategory,
  getSubCategory,
  getSubSubCategory,
  getMaterial,
  getColor
}
