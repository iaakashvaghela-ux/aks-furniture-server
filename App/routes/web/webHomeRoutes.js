const { webSlider, webCollectionMenu } = require("../../controller/web/webHomeController");
const { webProductView } = require("../../controller/web/webProductontroller");


let homeRouter = require("express").Router();

homeRouter.get("/slider", webSlider);
homeRouter.get("/collection-menu", webCollectionMenu);



module.exports = homeRouter;
