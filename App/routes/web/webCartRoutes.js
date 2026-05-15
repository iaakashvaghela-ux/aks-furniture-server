let cartRouter = require("express").Router();
const { addToCart, getCartItems, removeFromCart, updateCartQuantity } = require("../../controller/web/cartController");


cartRouter.post("/add", addToCart);
cartRouter.get("/view", getCartItems);
cartRouter.post("/remove", removeFromCart);
cartRouter.post("/update-quantity", updateCartQuantity);
module.exports = cartRouter;