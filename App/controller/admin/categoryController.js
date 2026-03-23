const { createSlug } = require("../../config/helper");
const categoryModel = require("../../model/categoryModel");
const subCategoryModel = require("../../model/subCategoryModel");
const subSubCategoryModel = require("../../model/subSubCategoryModel");

const categoryCreate = async (req, res) => {
  let { name } = req.body;

  let slug = createSlug(name);

  try {


    let samecategory = await categoryModel.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
      deleted_at: null
    })

    if (samecategory) {
      return res.send({
        _status: false,
        _message: "Category already exist"
      })
    }

    let data = {
      ...req.body,
      image: req.file ? req.file.filename : null
    }
    data.slug = slug;

    let category = await categoryModel.create(data)

    res.send({
      _status: true,
      _message: "Category Added",
      data: category
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




let categoryView = async (req, res) => {

  let filter = {
    deleted_at: null
  }
  let data = await categoryModel.find(filter)
  let obj = {
    _status: true,
    _message: "category View",
    path: process.env.CATEGORYPATH,
    data
  }
  res.send(obj)
}

let catSingleData = async (req, res) => {
  let { id } = req.params;
  let Single = await categoryModel.findById(id)

  res.status(200).json({
    _status: true,
    path: process.env.CATEGORYPATH,
    _data: Single,
    _message: "single data found"
  })
}



let categoryDelete = async (req, res) => {
  try {
    let { ids } = req.body;
    await categoryModel.updateMany({ _id: { $in: ids } }, { $set: { deleted_at: Date.now() } });
    await subCategoryModel.updateMany({ parentCategory: ids }, { $set: { deleted_at: Date.now() } });
    await subSubCategoryModel.updateMany({ parentCategory: ids }, { $set: { deleted_at: Date.now() } });
    res.send({
      _status: true,
      _message: "Category Deleted"
    });
  } catch (err) {
    res.send({ _status: false, _message: err.message });
  }
}

let categoryUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let data = { ...req.body };
    if (req.file) {
      data.image = req.file.filename;
    }
    if (data.name) {
      data.slug = createSlug(data.name);
    }
    await categoryModel.findByIdAndUpdate(id, data);
    res.send({
      _status: true,
      _message: "Category Updated"
    });
  } catch (err) {
    res.send({ _status: false, _message: err.message });
  }
}

let categoryChangeStatus = async (req, res) => {
  try {
    let { ids } = req.body;
    await categoryModel.updateMany({ _id: ids },

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
      _message: "Category Status Changed"
    });
  } catch (err) {
    res.send({ _status: false, _message: err.message });
  }
}

module.exports = { categoryCreate, categoryView, categoryDelete, categoryUpdate, categoryChangeStatus, catSingleData }
