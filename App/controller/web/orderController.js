const cartModel = require("../../model/cartModel");
const orderModel = require("../../model/orderModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: "rzp_test_WAft3lA6ly3OBc",
  key_secret: "68E17CNWY8SemCvZ6ylOkuOY",
});


let saveOrder = async (req, res) => {
  try {

    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Authorization token missing" });
    }
    let decoded = jwt.verify(token, process.env.TOKENKEY);
    let userId = decoded.userId;
    if (req.body.paymentMethod == '1') {
      const order = new orderModel({
        ...req.body,
        userId
      });
      const savedOrder = await order.save();
      res.status(200).send({
        _status: true,
        message: "Order saved successfully",
        data: savedOrder
      });
      await cartModel.deleteMany({ userId });
    } else if (req.body.paymentMethod == '2') {
      let orderData = {
        ...req.body,
        userId
      }

      orderData.paymentStatus = "1";
      orderData.orderStatus = "pending";
      const order = new orderModel(orderData);
      const savedOrder = await order.save();
      let options = {
        amount: orderData.orderAmount * 100,
        currency: "INR",
        receipt: savedOrder._id.toString(),
      };
      let orderRes = await instance.orders.create(options);
      await orderModel.updateOne(
        { _id: savedOrder._id },
        { $set: { razorpayOrderId: orderRes.id } },
      );
      res.status(200).send({
        _status: true,
        message: "Order saved successfully",
        data: savedOrder,
        orderRes: orderRes
      });
      await cartModel.deleteMany({ userId });
    }

  } catch (err) {
    console.log(err.message);
    let errors = []
    if (err.errors) {
      for (const key in err.errors) {
        const loopObj = {}
        loopObj[key] = err.errors[key].message
        errors.push(loopObj)
      }
    } else {
      errors.push({ message: err.message });
    }
    let obj = {
      _status: false,
      errors
    }
    res.status(400).send(obj)
  }
}


let verfiyPayment = async (req, res) => {
  let { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  let sign = razorpay_order_id + "|" + razorpay_payment_id;
  let expectedSign = crypto
    .createHmac("sha256", "68E17CNWY8SemCvZ6ylOkuOY")
    .update(sign.toString())
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    //Payment Success
    await orderModel.updateOne(
      { razorpayOrderId: razorpay_order_id },
      {
        $set: {
          paymentStatus: "2",
          razorpayPayment: razorpay_payment_id,
          orderStatus: "process",
        },
      },
    );
    // await cartModel.deleteMany({ userId: req.body.userId });
    res
      .status(200)
      .json({ _status: true, _message: "Payment verified successfully" });
  }
};




let getOrder = async (req, res) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Authorization token missing" });
    }
    let decoded = jwt.verify(token, process.env.TOKENKEY);
    let userId = decoded.userId;
    const orders = await orderModel.find({ userId });
    res.status(200).send({
      _status: true,
      message: "Orders fetched successfully",
      data: orders
    });
  } catch (err) {
    console.log(err.message);
    let errors = []
    if (err.errors) {
      for (const key in err.errors) {
        const loopObj = {}
        loopObj[key] = err.errors[key].message
        errors.push(loopObj)
      }
    } else {
      errors.push({ message: err.message });
    }
    let obj = {
      _status: false,
      errors
    }
    res.status(400).send(obj)
  }
}

module.exports = { saveOrder, getOrder, verfiyPayment }