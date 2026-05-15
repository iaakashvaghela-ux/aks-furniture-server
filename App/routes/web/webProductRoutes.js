let productRouter = require("express").Router();
const { webProductView, webSingleProduct, categoryView, getProductColor } = require("../../controller/web/webProductontroller");

productRouter.get("/view", webProductView);
productRouter.get("/category/view", categoryView);
productRouter.get("/color/view", getProductColor);
productRouter.get("/:slug", webSingleProduct);
module.exports = productRouter;
