const materialsModel = require("../../model/materialsModel")

let materialsCreate = async (req, res) => {

  try {
    let { name } = req.body
    let samematerialsName = await materialsModel.findOne({
      name: name,
      deleted_at: null
    })

    if (samematerialsName) {
      let obj = {
        _status: false,
        _message: "samematerials Name Already exist"
      }
      res.send(obj)
    } else {
      await materialsModel.create(req.body)
      let obj = {
        _status: true,
        _message: "materials Added"
      }
      res.send(obj)
    }
  }
  catch (err) {
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
  }
}

let materialsView = async (req, res) => {

  let filter = {
    deleted_at: null
  }
  let data = await materialsModel.find(filter)
  let obj = {
    _status: true,
    _message: "materials View",
    data
  }
  res.send(obj)
}

let materialsSingleData = async (req, res) => {
  let { id } = req.params;
  let Single = await materialsModel.findById(id)

  res.status(200).json({
    _status: true,
    _data: Single,
    _message: "single data found"
  })
}


let materialsDelete = (req, res) => {
  console.log(req.body);
  let { ids } = req.body
  materialsModel.updateMany(
    {
      _id: ids
    },
    {
      $set: {
        deleted_at: Date.now()
      }
    }
  )
    .then((apires) => {
      let obj = {
        _status: true,
        _message: "materials Delete"
      }
      res.send(obj)
    })
    .catch((err) => {
      let obj = {
        _status: false,
        _message: err.errors
      }
      res.send(obj)
    })
}

let materialsUpdate = (req, res) => {
  let obj = {
    _status: true,
    _message: "materials Update"
  }
  res.send(obj)
}

let materialsChangeStatus = async (req, res) => {

  let { ids } = req.body

  await materialsModel.updateMany(

    { _id: ids },

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
    }
  )

  let obj = {
    _status: true,
    _message: "materials ChangeStatus"
  }
  res.send(obj)
}

module.exports = { materialsCreate, materialsView, materialsDelete, materialsUpdate, materialsChangeStatus, materialsSingleData }