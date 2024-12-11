import {axiosInstance} from ".";

//Get all product
export const GetAllProduct = async () => {
    try{
        const response = await axiosInstance.get("/api/product/getallproduct");
        return response.data;
    }catch(err){
        return err;
    }
};

//Get all product by seller
export const GetProduct = async (id) => {
    try{
        const response = await axiosInstance.get(`/api/product/getproduct/${id}`);
        return response.data;
    }catch(err){
        return err;
    }
};


//Add product
export const AddProduct = async (payload) => {
    try{
        const response = await axiosInstance.post("/api/product/addproduct",payload);
        return response.data;
    }catch(err){
        return err;
    }
};

//Update product
export const UpdateProduct = async (id, payload) => {
    try{
        const response = await axiosInstance.put(`/api/product/updateproduct/${id}`, payload);
        return response.data;
    }catch(err){
        return err;
    }
};

//Delete product
export const DeleteProduct = async (id) => {
    try{
        const response = await axiosInstance.delete(`/api/product/deleteproduct/${id}`);
        return response.data;
    }catch(err){
        return err;
    }
};

//Update product status
export const UpdateStatus = async (id, payload) => {
    try {
       const response = await axiosInstance.patch(`/api/product/updatestatus/${id}`, {status : payload});
        return response.data;
    }catch{
        return err;
    }
   };
   
