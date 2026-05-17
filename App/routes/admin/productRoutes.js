let express = require("express");
const { upload } = require("../../config/imageUpload");

let productRouter = express.Router();
// const { productCreate, productView, productDelete, productUpdate, productChangeStatus, productSingleData } = require("../../controller/admin/productController");
const { getParentCategory, getSubCategory, getSubSubCategory, getMaterial, getColor, productCreate, productView, getSingleProduct, productUpdate, productDelete, productChangeStatus } = require("../../controller/admin/productController");

productRouter.post("/add", upload.fields([
  { name: "productImage", maxCount: 1 },
  { name: "backImage", maxCount: 1 },
  { name: "galleryImage", maxCount: 5 }
]), productCreate);
productRouter.get("/view", productView);
productRouter.get("/parent", getParentCategory);
productRouter.get("/sub-category/:id", getSubCategory);
productRouter.get("/sub-sub-category/:id", getSubSubCategory);
productRouter.get("/material", getMaterial);
productRouter.get("/color", getColor);
productRouter.get('/single/:id', getSingleProduct)
productRouter.post('/delete', productDelete)
productRouter.put('/update/:id', upload.fields([
  { name: "productImage", maxCount: 1 },
  { name: "backImage", maxCount: 1 },
  { name: "galleryImage", maxCount: 5 }
]), productUpdate)
productRouter.post('/change-status', productChangeStatus)



module.exports = productRouter;
