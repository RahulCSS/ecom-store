import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    items: { type: Array, required: true},
    amount: { type: Number, required: true},
    address: { type: Object, required: true},
    address: { type: String, required: true, default:'Order Placed'},
    paymentMethod: {type: String, required: true},
    payment: {type: Boolean, required: true, default: false},
    date: {type: Number, required: true}
},{ timestamps: true, minimize: false});

const orderModel = mongoose.models.product || mongoose.model('order', orderSchema);

export default orderModel;