const colorModel = require("../../model/colorModel")

let colorCreate = async (req, res) => {

    try {
        let { colorName } = req.body


        let samecolor = await colorModel.findOne({
            colorName: colorName,
            deleted_at: null
        })

        if (samecolor) {
            let obj = {
                _status: false,
                _message: "Color Already exist"
            }
            res.send(obj)
        } else {
            let color = await colorModel.create(req.body)
            let obj = {
                _status: true,
                _message: "Controller Function | Color Added"
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

let singleData = async (req, res) => {
    let { id } = req.params;
    let Single = await colorModel.findById(id)

    res.status(200).json({
        _status: true,
        _data: Single,
        _message: "single data found"
    })
}

let colorView = async (req, res) => {

    let filter = {
        deleted_at: null
    }
    let data = await colorModel.find(filter)
    let obj = {
        _status: true,
        _message: "Color View",
        data
    }
    res.send(obj)
}


let colorDelete = (req, res) => {

    let { ids } = req.body
    colorModel.updateMany(
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
                _message: "Color Delete"
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

let colorUpdate = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let updateData = await colorModel.updateOne({ _id: id }, { $set: data })


    let obj = {
        _status: true,
        _message: "Color Update",
        updateData
    }
    res.send(obj)
}

let colorChangeStatus = async (req, res) => {
    let { ids } = req.body

    await colorModel.updateMany(

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

module.exports = { colorCreate, colorView, colorDelete, colorUpdate, colorChangeStatus, singleData }