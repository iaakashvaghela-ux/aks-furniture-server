const testimonialsModel = require("../../model/testimonialsModel");

let testimonialsCreate = async (req, res) => {
  try {
    let { name } = req.body;


    let sametestimonials = await testimonialsModel.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
      deleted_at: null
    })

    if (sametestimonials) {
      return res.send({
        _status: false,
        _message: "testimonials with this name already exists"
      })
    }

    let data = {
      ...req.body,
      image: req.file ? req.file.filename : null
    }

    let testimonials = await testimonialsModel.create(data)

    res.status(201).send({
      _status: true,
      _message: "testimonials added successfully",
      data: testimonials
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


let testimonialsView = async (req, res) => {
  try {
    let _data = await testimonialsModel.find({ deleted_at: null }).sort({ order: 1 });
    res.send({
      _status: true,
      _message: "testimonials view",
      _data,
      path: process.env.TESTIMONIALSPATH
    });
  } catch (err) {
    res.status(500).send({ _status: false, _message: err.message });
  }
}


let testimonialsSingleData = async (req, res) => {
  let { id } = req.params;
  let Single = await testimonialsModel.findById(id)

  res.status(200).json({
    _status: true,
    path: process.env.testimonialsPATH,
    _data: Single,
    _message: "single data found"
  })
}

let testimonialsDelete = async (req, res) => {
  try {
    let { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).send({ _status: false, _message: "Invalid IDs provided" });
    }
    await testimonialsModel.updateMany({ _id: { $in: ids } }, { $set: { deleted_at: new Date() } });
    res.send({ _status: true, _message: "testimonials(s) deleted successfully" });
  } catch (err) {
    res.status(500).send({ _status: false, _message: err.message });
  }
}


let testimonialsUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let updateData = { ...req.body };


    if (req.file) {
      updateData.image = req.file.filename;
    }

    let updatedtestimonials = await testimonialsModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedtestimonials) {
      return res.status(404).send({ _status: false, _message: "testimonials not found" });
    }

    res.send({ _status: true, _message: "testimonials updated successfully", data: updatedtestimonials });
  } catch (err) {
    res.status(500).send({ _status: false, _message: err.message });
  }
}

let testimonialsChangeStatus = async (req, res) => {
  try {
    let { ids } = req.body;
    await testimonialsModel.updateMany({ _id: ids },

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
      _message: "testimonials Status Changed"
    });
  } catch (err) {
    res.send({ _status: false, _message: err.message });
  }
}


module.exports = {
  testimonialsCreate,
  testimonialsView,
  testimonialsSingleData,
  testimonialsDelete,
  testimonialsUpdate,
  testimonialsChangeStatus
}