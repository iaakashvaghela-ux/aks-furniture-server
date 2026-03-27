let express = require("express");
const { faqCreate, faqView, faqDelete, faqUpdate, faqChangeStatus, faqSingleData } = require("../../controller/admin/faqController");



let faqRouter = express.Router();

faqRouter.post("/add", faqCreate);
faqRouter.get('/view', faqView)
faqRouter.post('/delete', faqDelete)
faqRouter.put('/update/:id', faqUpdate)
faqRouter.post('/change-status', faqChangeStatus)
faqRouter.get('/single/:id', faqSingleData)


module.exports = faqRouter;