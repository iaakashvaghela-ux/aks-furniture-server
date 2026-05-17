let express = require("express");
const { upload } = require("../../config/imageUpload");
const { testimonialsCreate, testimonialsView, testimonialsSingleData, testimonialsDelete, testimonialsUpdate, testimonialsChangeStatus } = require("../../controller/admin/testimonialsController");

let testimonialsRouter = express.Router();

testimonialsRouter.post("/add", upload.single("image"), testimonialsCreate);
testimonialsRouter.get("/view", testimonialsView);
testimonialsRouter.post('/delete', testimonialsDelete);
testimonialsRouter.put('/update/:id', upload.single("image"), testimonialsUpdate);
testimonialsRouter.post('/change-status', testimonialsChangeStatus);
testimonialsRouter.get('/single/:id', testimonialsSingleData);

module.exports = testimonialsRouter;
