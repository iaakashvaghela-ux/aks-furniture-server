const userModel = require("../../model/userModel")

let userView = async (req, res) => {
    try {
        let user = await userModel.find({ deleted_at: null })
        if (user) {
            let obj = {
                _status: true,
                _message: "User View",
                _data: user
            }
            res.send(obj)
        }
    } catch (err) {
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
let userDelete = async (req, res) => {
    let { ids } = req.body
    try {
        let user = await userModel.updateMany({ _id: ids }, { deleted_at: Date.now() })
        if (user) {
            let obj = {
                _status: true,
                _message: "User Delete",
                _data: user
            }
            res.send(obj)
        } else {
            let obj = {
                _status: false,
                _message: "User not found",
                // _data: user
            }
            res.send(obj)
        }
    } catch (err) {
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

let userChangeStatus = async (req, res) => {
    let { ids } = req.body
    try {
        let user = await userModel.updateMany({ _id: ids },

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
        if (user) {
            let obj = {
                _status: true,
                _message: "User ChangeStatus",
                _data: user
            }
            res.send(obj)
        } else {
            let obj = {
                _status: false,
                _message: "User not found",
                // _data: user
            }
            res.send(obj)
        }
    } catch (err) {
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

module.exports = {
    userView,
    userDelete,
    userChangeStatus
}