const jwt = require("jsonwebtoken");
const wishlistModel = require("../../model/wishlistModel");

const getUserIdFromToken = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ success: false, message: "Authorization token missing" });
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKENKEY);
        return decoded.userId;
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid authorization token" });
        return null;
    }
};

const addToWishlist = async (req, res) => {
    try {
        const { productId, price, image, name, category, path } = req.body;
        const userId = getUserIdFromToken(req, res);
        if (!userId) return;

        if (!productId || !price || !image || !name || !category || !path) {
            return res.status(400).json({ success: false, message: "Product details are required" });
        }

        const existingItem = await wishlistModel.findOne({ userId, productId });
        if (existingItem) {
            return res.status(200).json({ data: existingItem, success: true, message: "Item already in wishlist" });
        }

        const wishlistItem = await wishlistModel.create({
            userId,
            productId,
            price,
            image,
            name,
            category,
            path
        });

        res.status(200).json({ data: wishlistItem, success: true, message: "Item added to wishlist" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to add item to wishlist", error: error.message });
    }
};

const getWishlistItems = async (req, res) => {
    try {
        const userId = getUserIdFromToken(req, res);
        if (!userId) return;

        const wishlistItems = await wishlistModel
            .find({ userId })
            .populate("category", "name")
            .populate("productId", "slug stocks salePrice productName productImage galleryImage parentCategory");

        res.status(200).json({ data: wishlistItems, success: true, message: "Wishlist items fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch wishlist items", error: error.message });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { id, productId } = req.body;
        const userId = getUserIdFromToken(req, res);
        if (!userId) return;

        if (!id && !productId) {
            return res.status(400).json({ success: false, message: "Wishlist item id or product id is required" });
        }

        const filter = id ? { _id: id, userId } : { productId, userId };
        const wishlistItem = await wishlistModel.deleteOne(filter);

        res.status(200).json({ data: wishlistItem, success: true, message: "Item removed from wishlist" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to remove item from wishlist", error: error.message });
    }
};

const toggleWishlist = async (req, res) => {
    try {
        const { productId, price, image, name, category, path } = req.body;
        const userId = getUserIdFromToken(req, res);
        if (!userId) return;

        const existingItem = await wishlistModel.findOne({ userId, productId });
        if (existingItem) {
            await wishlistModel.deleteOne({ _id: existingItem._id, userId });
            return res.status(200).json({ data: existingItem, inWishlist: false, success: true, message: "Item removed from wishlist" });
        }

        if (!productId || !price || !image || !name || !category || !path) {
            return res.status(400).json({ success: false, message: "Product details are required" });
        }

        const wishlistItem = await wishlistModel.create({
            userId,
            productId,
            price,
            image,
            name,
            category,
            path
        });

        res.status(200).json({ data: wishlistItem, inWishlist: true, success: true, message: "Item added to wishlist" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update wishlist", error: error.message });
    }
};

const clearWishlist = async (req, res) => {
    try {
        const userId = getUserIdFromToken(req, res);
        if (!userId) return;

        const wishlistItems = await wishlistModel.deleteMany({ userId });
        res.status(200).json({ data: wishlistItems, success: true, message: "Wishlist cleared successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to clear wishlist", error: error.message });
    }
};

module.exports = {
    addToWishlist,
    getWishlistItems,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist
};
