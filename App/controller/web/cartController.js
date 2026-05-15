const cartModel = require("../../model/cartModel");
const jwt = require("jsonwebtoken");

let addToCart = async (req, res) => {
    try {
        let { productId, quantity, price, image, name, category, path } = req.body;
        let token = req.headers.authorization?.split(" ")[1];
        // console.log(token);
        if (!token) {
            return res.status(401).json({ success: false, message: "Authorization token missing" });
        }
        let decoded = jwt.verify(token, process.env.TOKENKEY);
        let userId = decoded.userId;
        // console.log(userId);
        let cart = await cartModel.findOne({ userId, productId });
        if (cart) {
            cart.quantity += quantity;
            await cart.save();
            return res.status(200).json({ data: cart, success: true, message: "Item added to cart" });
        }
        cart = await cartModel.create({ userId, productId, quantity, price, image, name, category, path });
        res.status(200).json({ data: cart, success: true, message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to add item to cart", error: error.message });
    }
}

let getCartItems = async (req, res) => {
    try {
        let token = req.headers.authorization?.split(" ")[1];
        // console.log(token);
        if (!token) {
            return res.status(401).json({ success: false, message: "Authorization token missing" });
        }
        let decoded = jwt.verify(token, process.env.TOKENKEY);
        let userId = decoded.userId;
        let cart = await cartModel.find({ userId }).populate("category", "name").populate("productId", "stocks");
        res.status(200).json({ data: cart, success: true, message: "Cart items fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch cart items", error: error.message });
    }
}

let removeFromCart = async (req, res) => {
    try {
        let { id } = req.body;
        let token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Authorization token missing" });
        }
        let decoded = jwt.verify(token, process.env.TOKENKEY);
        let userId = decoded.userId;
        let cart = await cartModel.deleteOne({ _id: id, userId });
        res.status(200).json({ data: cart, success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to remove item from cart", error: error.message });
    }
}

let updateCartQuantity = async (req, res) => {
    try {
        let { id, quantity } = req.body;
        let token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Authorization token missing" });
        }
        let decoded = jwt.verify(token, process.env.TOKENKEY);
        let userId = decoded.userId;
        let cart = await cartModel.findOne({ _id: id, userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }
        if (quantity > cart.productId.stocks) {
            return res.status(400).json({ success: false, message: "Quantity exceeds stock" });
        }
        cart.quantity = quantity;
        await cart.save();
        res.status(200).json({ data: cart, success: true, message: "Cart item quantity updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update cart item quantity", error: error.message });
    }
}
module.exports = { addToCart, getCartItems, removeFromCart, updateCartQuantity };