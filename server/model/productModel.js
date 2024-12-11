import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    vendor_Id: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    name: { type: String, required: true, unique: true  },
    description: { type: String, required: true},
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true},
    subcategory: { type: String, required: true},
    status: {type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending'},
    imageUrl: [ String ],
},{ timestamps: true, minimize: false});

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;