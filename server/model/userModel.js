import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, default: '' },
    address: {type: String, default: '' },
    role: { type: String, enum: ['Admin', 'Customer', 'Vendor', 'Delivery'],required: true },
    status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active'},
    token: { type: String, default: ''},
    cart: {type: Object, default: {}},
},{timestamps: true, minimize: false});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
