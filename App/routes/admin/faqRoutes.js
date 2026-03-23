let express = require("express");
const { faqCreate, faqView, faqDelete, faqUpdate, faqChangeStatus } = require("../../controller/admin/faqController");



let faqRouter = express.Router();

faqRouter.post("/add", faqCreate);
faqRouter.get('/view', faqView)
faqRouter.post('/delete', faqDelete)
faqRouter.put('/update', faqUpdate)
faqRouter.post('/change-status', faqChangeStatus)



module.exports = faqRouter;