const wishlistRouter = require("express").Router();
const {
    addToWishlist,
    getWishlistItems,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist
} = require("../../controller/web/wishlistController");

wishlistRouter.post("/add", addToWishlist);
wishlistRouter.get("/view", getWishlistItems);
wishlistRouter.post("/remove", removeFromWishlist);
wishlistRouter.post("/toggle", toggleWishlist);
wishlistRouter.post("/clear", clearWishlist);

module.exports = wishlistRouter;
