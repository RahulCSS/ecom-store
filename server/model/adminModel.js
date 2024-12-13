import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true  },
    details: [ String ],
},{ timestamps: true, minimize: false});

const adminModel = mongoose.models.product || mongoose.model('admin', adminSchema);

export default adminModel;