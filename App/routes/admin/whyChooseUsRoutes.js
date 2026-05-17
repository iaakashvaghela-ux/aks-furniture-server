let express = require("express");
const { upload } = require("../../config/imageUpload");
const { whyChooseUsCreate, whyChooseUsView, whyChooseUsSingleData, whyChooseUsDelete, whyChooseUsUpdate, whyChooseUsChangeStatus } = require("../../controller/admin/whyChooseUsController");

let whyChooseUsRouter = express.Router();

whyChooseUsRouter.post("/add", upload.single("image"), whyChooseUsCreate);
whyChooseUsRouter.get("/view", whyChooseUsView);
whyChooseUsRouter.post('/delete', whyChooseUsDelete);
whyChooseUsRouter.put('/update/:id', upload.single("image"), whyChooseUsUpdate);
whyChooseUsRouter.post('/change-status', whyChooseUsChangeStatus);
whyChooseUsRouter.get('/single/:id', whyChooseUsSingleData);

module.exports = whyChooseUsRouter;
