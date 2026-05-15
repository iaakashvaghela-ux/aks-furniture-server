let express = require("express");
const { userView, userDelete, userChangeStatus } = require("../../controller/admin/userController");
let userRouter = express.Router();

userRouter.get('/view', userView);
userRouter.post('/delete', userDelete);
userRouter.post('/change-status', userChangeStatus);



module.exports = userRouter;