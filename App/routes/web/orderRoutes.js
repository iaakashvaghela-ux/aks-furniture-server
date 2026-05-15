const { saveOrder, getOrder, verfiyPayment } = require("../../controller/web/orderController");

let orderRouter = require("express").Router();

orderRouter.post("/save", saveOrder);
orderRouter.get("/get", getOrder);
orderRouter.post("/verify-payment", verfiyPayment);
module.exports = orderRouter;