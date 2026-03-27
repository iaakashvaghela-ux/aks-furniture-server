const whyChooseUsModel = require("../../model/whyChooseUsModel");

let whyChooseUsCreate = async (req, res) => {
  try {
    let { title } = req.body;


    let samewhyChooseUs = await whyChooseUsModel.findOne({
      title: { $regex: `^${title.trim()}$`, $options: "i" },
      deleted_at: null
    })

    if (samewhyChooseUs) {
      return res.send({
        _status: false,
        _message: "whyChooseUs with this title already exists"
      })
    }

    let data = {
      ...req.body,
      image: req.file ? req.file.filename : null
    }

    let whyChooseUs = await whyChooseUsModel.create(data)

    res.status(201).send({
      _status: true,
      _message: "whyChooseUs added successfully",
      data: whyChooseUs
    })

  } catch (err) {
    let errors = []
    if (err.errors) {
      for (const key in err.errors) {
        errors.push({ [key]: err.errors[key].message });
      }
    } else {
      errors.push({ error: err.message });
    }

    res.status(500).send({
      _status: false,
      _message: "Internal server error",
      errors
    })
  }
}


let whyChooseUsView = async (req, res) => {
  try {
    let _data = await whyChooseUsModel.find({ deleted_at: null }).sort({ order: 1 });
    res.send({
      _status: true,
      _message: "whyChooseUs view",
      _data,
      path: process.env.WHYCHOOSEUSPATH
    });
  } catch (err) {
    res.status(500).send({ _status: false, _message: err.message });
  }
}


let whyChooseUsSingleData = async (req, res) => {
  let { id } = req.params;
  let Single = await whyChooseUsModel.findById(id)

  res.status(200).json({
    _status: true,
    path: process.env.WHYCHOOSEUSPATH,
    _data: Single,
    _message: "single data found"
  })
}

let whyChooseUsDelete = async (req, res) => {
  try {
    let { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).send({ _status: false, _message: "Invalid IDs provided" });
    }
    await whyChooseUsModel.updateMany({ _id: { $in: ids } }, { $set: { deleted_at: new Date() } });
    res.send({ _status: true, _message: "whyChooseUs(s) deleted successfully" });
  } catch (err) {
    res.status(500).send({ _status: false, _message: err.message });
  }
}


let whyChooseUsUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let updateData = { ...req.body };


    if (req.file) {
      updateData.image = req.file.filename;
    }

    let updatedwhyChooseUs = await whyChooseUsModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedwhyChooseUs) {
      return res.status(404).send({ _status: false, _message: "whyChooseUs not found" });
    }

    res.send({ _status: true, _message: "whyChooseUs updated successfully", data: updatedwhyChooseUs });
  } catch (err) {
    res.status(500).send({ _status: false, _message: err.message });
  }
}

let whyChooseUsChangeStatus = async (req, res) => {
  try {
    let { ids } = req.body;
    await whyChooseUsModel.updateMany({ _id: ids },

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
      _message: "whyChooseUs Status Changed"
    });
  } catch (err) {
    res.send({ _status: false, _message: err.message });
  }
}


module.exports = {
  whyChooseUsCreate,
  whyChooseUsView,
  whyChooseUsSingleData,
  whyChooseUsDelete,
  whyChooseUsUpdate,
  whyChooseUsChangeStatus
}