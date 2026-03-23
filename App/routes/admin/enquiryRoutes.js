let express = require("express");
const { enquiryCreate, enquiryView, enquiryDelete, enquiryUpdate, enquiryChangeStatus } = require("../../controller/admin/enquiryController");
let enquiryRouter = express.Router();

enquiryRouter.post("/add", enquiryCreate);
enquiryRouter.get('/view', enquiryView);
enquiryRouter.delete('/delete', enquiryDelete);
enquiryRouter.put('/update', enquiryUpdate);
enquiryRouter.put('/change-status',enquiryChangeStatus);


module.exports = enquiryRouter;