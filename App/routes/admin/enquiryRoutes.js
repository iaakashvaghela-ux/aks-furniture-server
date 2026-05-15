let express = require("express");
const { enquiryCreate, enquiryView, enquiryDelete, enquiryUpdate, enquiryChangeStatus } = require("../../controller/admin/enquiryController");
let enquiryRouter = express.Router();

enquiryRouter.post("/add", enquiryCreate);
enquiryRouter.get('/view', enquiryView);
enquiryRouter.post('/delete', enquiryDelete);
enquiryRouter.put('/update/:id', enquiryUpdate);
enquiryRouter.post('/change-status',enquiryChangeStatus);


module.exports = enquiryRouter;
