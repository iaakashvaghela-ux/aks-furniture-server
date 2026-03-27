const countryModel = require("../../model/countryModel")

let countryCreate = async (req, res) => {
    try {
        let { name } = req.body
        let samecountry = await countryModel.findOne({
            name: name,
            deleted_at: null
        })
        if (samecountry) {
            let obj = {
                _status: false,
                _message: "country Already exist"
            }
            res.send(obj)
        } else {
            await countryModel.create(req.body)
            let obj = {
                _status: true,
                _message: " country Added"
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

let countryView = async (req, res) => {

    let filter = {
        deleted_at: null
    }
    let data = await countryModel.find(filter)
    let obj = {
        _status: true,
        _message: "country View",
        data
    }
    res.send(obj)
}

let countrySingleData = async (req, res) => {
    let { id } = req.params;
    let Single = await countryModel.findById(id)

    res.status(200).json({
        _status: true,
        _data: Single,
        _message: "single data found"
    })
}
let countryDelete = (req, res) => {

    let { ids } = req.body
    countryModel.updateMany(
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
                _message: "country Delete"
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

let countryUpdate = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let updateData = await countryModel.updateOne({ _id: id }, { $set: data })


    let obj = {
        _status: true,
        _message: "country Update",
        updateData
    }
    res.send(obj)
}

let countryChangeStatus = async (req, res) => {
    let { ids } = req.body

    await countryModel.updateMany(

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


module.exports = { countryCreate, countryView, countryDelete, countryUpdate, countryChangeStatus, countrySingleData }