const categoryModel = require("../../model/categoryModel")
const subCategoryModel = require("../../model/subCategoryModel")
const subSubCategoryModel = require("../../model/subSubCategoryModel")

const subCategoryCreate = async (req, res) => {

  try {

    let { name } = req.body

    let samesubCategory = await subCategoryModel.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
      deleted_at: null
    })

    if (samesubCategory) {
      return res.send({
        _status: false,
        _message: "subCategory already exist"
      })
    }

    let data = {
      ...req.body,
      image: req.file ? req.file.filename : null
    }

    let subCategory = await subCategoryModel.create(data)

    res.send({
      _status: true,
      _message: "subCategory Added",
      data: subCategory
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




let subCategoryView = async (req, res) => {
  let filter = {
    deleted_at: null
  }
  let data = await subCategoryModel.find(filter).populate("parentCategory", "name")
  let obj = {
    _status: true,
    _message: "subCategory View",
    path: process.env.SUBCATEGORYPATH,
    data
  }
  res.send(obj)
}

let subCatSingleData = async (req, res) => {
  let { id } = req.params;
  let Single = await subCategoryModel.findById(id)

  res.status(200).json({
    _status: true,
    path: process.env.SUBCATEGORYPATH,
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

let subCategoryDelete = async (req, res) => {
  try {
    let { ids } = req.body;
    await subCategoryModel.updateMany({ _id: { $in: ids } }, { $set: { deleted_at: Date.now() } });
    await subSubCategoryModel.updateMany({ subCategory: ids }, { $set: { deleted_at: Date.now() } });
    res.send({
      _status: true,
      _message: "subCategory Deleted"
    });
  } catch (err) {
    res.send({ _status: false, _message: err.message });
  }
}

let subCategoryUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let data = { ...req.body };
    if (req.file) {
      data.image = req.file.filename;
    }
    await subCategoryModel.findByIdAndUpdate(id, data);
    res.send({
      _status: true,
      _message: "subCategory Updated"
    });
  } catch (err) {
    res.send({ _status: false, _message: err.message });
  }
}

let subCategoryChangeStatus = async (req, res) => {
  try {
    let { ids } = req.body;
    await subCategoryModel.updateMany({ _id: ids },

      [
        {
          $set: {
            status: {
              $not: '$status'
            }
          }
        }
      ],
      {
        updatePipeline: true
      });
    res.send({
      _status: true,
      _message: "subCategory Status Changed"
    });
  } catch (err) {
    res.send({ _status: false, _message: err.message });
  }
}

module.exports = { subCategoryCreate, subCategoryView, getParentCategory, subCategoryDelete, subCategoryUpdate, subCategoryChangeStatus, subCatSingleData }