let express = require("express");
let {userAdd,userView,userDelete,userUpdate,userChangeStatus}=require("../../controller/admin/userController")
let userRouter = express.Router();

userRouter.post("/add", userAdd);
userRouter.get('/view', userView);
userRouter.post('/delete', userDelete);
userRouter.put('/update', userUpdate);
userRouter.post('/change-status',userChangeStatus);



module.exports = userRouter;