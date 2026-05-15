let express = require("express");
const { viewOrders, deleteOrder, multiDeleteOrders, updateOrderStatus, viewSingleOrder } = require("../../controller/admin/orderController");
let orderRouter = express.Router();

orderRouter.get("/view-orders", viewOrders);
orderRouter.get("/view-order/:id", viewSingleOrder);
orderRouter.delete("/delete-order/:id", deleteOrder);
orderRouter.post("/multi-delete-orders", multiDeleteOrders);
orderRouter.put("/update-order-status/:id", updateOrderStatus);

module.exports = orderRouter;
