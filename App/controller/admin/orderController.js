const orderModel = require("../../model/orderModel");

let viewOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate("userId").sort({ createdAt: -1 });
        res.status(200).send({
            _status: true,
            message: "Orders fetched successfully",
            data: orders
        });
    } catch (err) {
        res.status(400).send({
            _status: false,
            message: err.message
        });
    }
}

let deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await orderModel.findByIdAndDelete(id);
        res.status(200).send({
            _status: true,
            message: "Order deleted successfully"
        });
    } catch (err) {
        res.status(400).send({
            _status: false,
            message: err.message
        });
    }
}

let multiDeleteOrders = async (req, res) => {
    try {
        const { ids } = req.body;
        await orderModel.deleteMany({ _id: { $in: ids } });
        res.status(200).send({
            _status: true,
            message: "Orders deleted successfully"
        });
    } catch (err) {
        res.status(400).send({
            _status: false,
            message: err.message
        });
    }
}

let updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;
        await orderModel.findByIdAndUpdate(id, { orderStatus });
        res.status(200).send({
            _status: true,
            message: "Order status updated successfully"
        });
    } catch (err) {
        res.status(400).send({
            _status: false,
            message: err.message
        });
    }
}

let viewSingleOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id).populate("userId");
        res.status(200).send({
            _status: true,
            message: "Order fetched successfully",
            data: order
        });
    } catch (err) {
        res.status(400).send({
            _status: false,
            message: err.message
        });
    }
}

module.exports = { viewOrders, deleteOrder, multiDeleteOrders, updateOrderStatus, viewSingleOrder };
