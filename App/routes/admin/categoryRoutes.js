let express = require("express");
const { categoryCreate, categoryView, categoryDelete, categoryUpdate, categoryChangeStatus, catSingleData
} = require("../../controller/admin/categoryController");
const { upload } = require("../../config/imageUpload");

let categoryRouter = express.Router();

categoryRouter.post("/add", upload.single("image"), categoryCreate);
categoryRouter.get("/view", categoryView);

categoryRouter.post('/delete', categoryDelete)
categoryRouter.put('/update/:id', upload.single("image"), categoryUpdate)
categoryRouter.post('/change-status', categoryChangeStatus)
categoryRouter.get("/single/:id", catSingleData);
module.exports = categoryRouter;
