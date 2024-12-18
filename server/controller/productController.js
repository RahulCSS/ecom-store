import productModel from "../model/productModel.js";


// Register product
const addProduct = async (req,res) =>{
    const {name, description, price, stock, category, subcategory, sellerId} = req.body;
    try{
        const exists = await productModel.findOne({name});
        if(exists){
            return res.json({success:false , message: "Product already exists"})
        }

        const newProduct = new productModel(req.body);
        await newProduct.save();
        res.json({success:true, message: "Product added successfully"}) ;
    }catch(error){
        console.log(error);
        res.json({success:false, message: "Error"});
    };
};

// Fetch all products
const getAllProduct = async (req, res) =>{
    try{
        const products = await productModel.find().populate('vendor_Id', 'name');;
        res.json({success:true, message: "Products fetched successfully", data: products}) ;
    }catch(error){
        console.log(error);
        res.json({success:false, message: "Error"});
    };
};

// Fetch all products by SellerId
const getProduct = async (req, res) =>{
    const { id } = req.params;
    try{
        const products = await productModel.find({vendor_Id: id});
        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found for this seller' });
        }
        return res.json({ success: true, message: "Products fetched successfully", data: products });
    }catch(error){
        return res.status(500).json({ success: false, message: "Error fetching products" });
    };
};

// Update a product
const updateProduct = async (req,res) =>{
    const { id } = req.params;
    const {name, description, price, stock, category, subcategory, imageUrl} = req.body;
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { name, description, price, stock, category, imageUrl }, 
            { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: "Product updated successfully", data: updatedProduct });
    }catch{
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value' });
    }
    try {
        const product = await productModel.findById(id);
        if (!product) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
        product.status = status;
        await product.save();
        return res.status(200).json({ success: true, message: 'Product status updated successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }

};

export { addProduct, getProduct, getAllProduct, updateProduct, deleteProduct , updateStatus};