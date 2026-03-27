let express = require("express");
const multer = require("multer");

let productRouter = express.Router();
const path = require("path");
// const { productCreate, productView, productDelete, productUpdate, productChangeStatus, productSingleData } = require("../../controller/admin/productController");
const { getParentCategory, getSubCategory, getSubSubCategory } = require("../../controller/admin/productController");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/product')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })




// productRouter.post("/add", upload.array("image"), productCreate);
// productRouter.get("/view", productView);
productRouter.get("/parent", getParentCategory);
productRouter.get("/sub-category/:id", getSubCategory);
productRouter.get("/sub-sub-category/:id", getSubSubCategory);
productRouter.get("/material", getMaterial);
productRouter.get("/color", getColor);
// productRouter.get('/single/:id', productSingleData)
// productRouter.post('/delete', productDelete)
// productRouter.put('/update/:id', upload.array("image"), productUpdate)
// productRouter.post('/change-status', productChangeStatus)



module.exports = productRouter;