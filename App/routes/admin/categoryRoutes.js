let express = require("express");
const { categoryCreate, categoryView, categoryDelete, categoryUpdate, categoryChangeStatus, catSingleData
} = require("../../controller/admin/categoryController");
const multer = require("multer");

let categoryRouter = express.Router();
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/category')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

categoryRouter.post("/add", upload.single("image"), categoryCreate);
categoryRouter.get("/view", categoryView);

categoryRouter.post('/delete', categoryDelete)
categoryRouter.put('/update/:id', upload.single("image"), categoryUpdate)
categoryRouter.post('/change-status', categoryChangeStatus)
categoryRouter.get("/single/:id", catSingleData);
module.exports = categoryRouter;