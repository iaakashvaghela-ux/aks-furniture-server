const categoryModel = require("../../model/categoryModel")
const subCategoryModel = require("../../model/subCategoryModel")
const subSubCategoryModel = require("../../model/subSubCategoryModel")

const subSubCategoryCreate = async (req, res) => {

  try {

    let { name } = req.body

    let samesubSubCategory = await subSubCategoryModel.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
      deleted_at: null
    })

    if (samesubSubCategory) {
      return res.send({
        _status: false,
        _message: "subSubCategory already exist"
      })
    }

    let data = {
      ...req.body,
      image: req.file ? req.file.filename : null
    }

    let subSubCategory = await subSubCategoryModel.create(data)

    res.send({
      _status: true,
      _message: "subSubCategory Added",
      data: subSubCategory
    })

  }
  catch (err) {

    let errors = []

    for (const key in err.errors) {
      const loopObj = {}
      loopObj[key] = err.errors[key].message
      errors.push(loopObj)
    }

    res.send({
      _status: false,
      errors
    })
  }

}


// subsubcategories

let subSubCategoryView = async (req, res) => {

  let filter = {
    deleted_at: null
  }
  let data = await subSubCategoryModel.find(filter).populate(["parentCategory", "subCategory"], "name")

  let obj = {
    _status: true,
    _message: "subSubCategory View",
    path: process.env.SUBSUBCATEGORYPATH,
    data
  }
  res.send(obj)
}

let subSubCatSingleData = async (req, res) => {
  let { id } = req.params;
  let Single = await subSubCategoryModel.findById(id)

  res.status(200).json({
    _status: true,
    path: process.env.SUBSUBCATEGORYPATH,
    _data: Single,
    _message: "single data found"
  })
}




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


let subSubCategoryDelete = async (req, res) => {
  try {
    let { ids } = req.body;
    await subSubCategoryModel.updateMany({ _id: { $in: ids } }, { $set: { deleted_at: Date.now() } });
    res.send({
      _status: true,
      _message: "subSubCategory Deleted"
    });
  } catch (err) {
    res.send({ _status: false, _message: err.message });
  }
}

let subSubCategoryUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let data = { ...req.body };

    if (req.file) {
      data.image = req.file.filename;
    }

    // console.log(data);
    await subSubCategoryModel.findByIdAndUpdate(id, data);
    res.send({
      _status: true,
      _message: "subSubCategory Updated"
    });
  } catch (err) {
    res.send({ _status: false, _message: err.message });
  }
}

let subSubCategoryChangeStatus = async (req, res) => {
  try {
    let { ids } = req.body;
    await subSubCategoryModel.updateMany({ _id: { $in: ids } }, [{ $set: { status: { $not: "$status" } } }],
      {
        updatePipeline: true
      });
    res.send({
      _status: true,
      _message: "subSubCategory Status Changed"
    });
  } catch (err) {
    res.send({ _status: false, _message: err.message });
  }
}

module.exports = { subSubCategoryCreate, subSubCategoryView, getParentCategory, getSubCategory, subSubCategoryDelete, subSubCategoryUpdate, subSubCategoryChangeStatus, subSubCatSingleData }
