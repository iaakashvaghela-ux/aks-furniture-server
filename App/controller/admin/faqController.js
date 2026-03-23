const faqModel = require("../../model/faqModel")


let faqCreate = async (req, res) => {
  try {
    let { question } = req.body
    let samefaq = await faqModel.findOne({
      question: question,
      deleted_at: null
    })
    if (samefaq) {
      let obj = {
        _status: false,
        _message: "faq Already exist"
      }
      res.send(obj)
    } else {
      await faqModel.create(req.body)
      let obj = {
        _status: true,
        _message: " faq Added"
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


let faqView = async (req, res) => {

  let filter = {
    deleted_at: null
  }
  let data = await faqModel.find(filter)
  let obj = {
    _status: true,
    _message: "faq View",
    data
  }
  res.send(obj)
}


let faqDelete = (req, res) => {

  let { ids } = req.body
  faqModel.updateMany(
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
        _message: "faq Delete"
      }
      res.send(obj)
    })
    .catch((err) => {
      let obj = {
        _status: false,
        _message: err.message
      }
      res.send(obj)
    })
}

let faqUpdate = (req, res) => {
  let obj = {
    _status: true,
    _message: "faq Update"
  }
  res.send(obj)
}

let faqChangeStatus = async (req, res) => {
  let { ids } = req.body

  await faqModel.updateMany(

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
    _message: "Color ChangeStatus"
  }
  res.send(obj)
}


module.exports = { faqCreate, faqView, faqDelete, faqUpdate, faqChangeStatus }