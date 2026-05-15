let mongoose=require('mongoose');
let orderSchema=new mongoose.Schema(
{
    orderItems:[],
    shippingAddess:{
        type:Object,
    },
    paymentMethod:{
        type:String,
        enum : ["1","2"], // 1 Cash on delivery, 2 Online payment
        default: '1'
    },
    paymentStatus:{
        type:String,
        enum : ["1","2","3"], //1 Pending, 2 Paid, 3 Failed
        default:1,
       
    },
    razorpayOrderId:{
        type:String,
    },
    razorpayPayment:{ //razorpayPayment 
        type:String,
    },
    orderAmount:{
        type:Number,
    },
    orderQty:{
        type:Number,
    },
    shippingCharges:{
        type:Number,
    },
    orderStatus:{
        type:String,
        enum : ["pending","process","completed"], //
        default: 'pending'
    },
   
    userId:{
        type: mongoose.Types.ObjectId, 
        ref: "user"
    }
},{
    timestamps:true
})


let orderModel=mongoose.model("order",orderSchema)
module.exports=orderModel;