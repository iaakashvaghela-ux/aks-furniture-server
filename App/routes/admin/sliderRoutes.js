let express = require("express");
const { upload } = require("../../config/imageUpload");
const { sliderCreate, sliderView, sliderDelete, sliderUpdate, sliderChangeStatus, sliderSingleData } = require("../../controller/admin/sliderController");

let sliderRouter = express.Router();

sliderRouter.post("/add", upload.single("image"), sliderCreate);
sliderRouter.get("/view", sliderView);
sliderRouter.post('/delete', sliderDelete);
sliderRouter.put('/update/:id', upload.single("image"), sliderUpdate);
sliderRouter.post('/change-status', sliderChangeStatus);
sliderRouter.get('/single/:id', sliderSingleData);

module.exports = sliderRouter;
