const { createSlug } = require("../../config/helper");
const sliderModel = require("../../model/sliderModel");

let sliderCreate = async (req, res) => {
  try {
    let { title } = req.body;

    if (!title) {
      return res.status(400).send({
        _status: false,
        _message: "Slider title is required"
      });
    }

    let slug = createSlug(title);

    let sameslider = await sliderModel.findOne({
      title: { $regex: `^${title.trim()}$`, $options: "i" },
      deleted_at: null
    })

    if (sameslider) {
      return res.send({
        _status: false,
        _message: "Slider with this title already exists"
      })
    }

    let data = {
      ...req.body,
      slug,
      image: req.file ? req.file.filename : null
    }

    let slider = await sliderModel.create(data)

    res.status(201).send({
      _status: true,
      _message: "Slider added successfully",
      data: slider
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

let sliderView = async (req, res) => {
  try {
    let data = await sliderModel.find({ deleted_at: null }).sort({ order: 1 });
    res.send({
      _status: true,
      _message: "Slider view",
      data,
      path: process.env.SLIDERPATH
    });
  } catch (err) {
    res.status(500).send({ _status: false, _message: err.message });
  }
}

let sliderSingleData = async (req, res) => {
  let { id } = req.params;
  let Single = await sliderModel.findById(id)

  res.status(200).json({
    _status: true,
    path: process.env.SLIDERPATH,
    _data: Single,
    _message: "single data found"
  })
}



let sliderDelete = async (req, res) => {
  try {
    let { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).send({ _status: false, _message: "Invalid IDs provided" });
    }
    await sliderModel.updateMany({ _id: { $in: ids } }, { $set: { deleted_at: new Date() } });
    res.send({ _status: true, _message: "Slider(s) deleted successfully" });
  } catch (err) {
    res.status(500).send({ _status: false, _message: err.message });
  }
}

let sliderUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let updateData = { ...req.body };

    if (updateData.title) {
      updateData.slug = createSlug(updateData.title);
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    let updatedSlider = await sliderModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedSlider) {
      return res.status(404).send({ _status: false, _message: "Slider not found" });
    }

    res.send({ _status: true, _message: "Slider updated successfully", data: updatedSlider });
  } catch (err) {
    res.status(500).send({ _status: false, _message: err.message });
  }
}



let sliderChangeStatus = async (req, res) => {
  try {
    let { ids } = req.body;
    await sliderModel.updateMany({ _id: ids },

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
      _message: "slider Status Changed"
    });
  } catch (err) {
    res.send({ _status: false, _message: err.message });
  }
}
module.exports = { sliderCreate, sliderView, sliderDelete, sliderUpdate, sliderChangeStatus, sliderSingleData }
