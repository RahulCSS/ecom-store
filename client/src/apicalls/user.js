import {axiosInstance} from ".";
const token = localStorage.getItem('token');

//*Register
export const RegisterUser = async (payload) => {
    try{
        const response = await axiosInstance.post("/api/user/register",payload);
        return response.data;
    }catch(err){
        console.log(err);
        return err;
    }
};

//*Login
export const LoginUser = async (payload) => {
    try{
        const response = await axiosInstance.post("/api/user/login",payload);
        return response.data;
    }catch(err){
        return err;
    }
};

//*Get Current User
export const GetCurrentUser = async () => {
    try{
        const response = await axiosInstance.get("/api/user/getcurrentuser",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }catch(err){
        return err;
    }
};

export const UpdateCart = async (id, payload) => {
    try{
        const response = await axiosInstance.put(`/api/user/updatecart/${id}`,{cart : payload});
        return response.data;
    }catch(err){
        return err;
    }
};

export const UpdateWishlist = async (id, payload) => {
    try{
        const response = await axiosInstance.put(`/api/user/updatewishlist/${id}`,{wishlist : payload});
        return response.data;
    }catch(err){
        return err;
    }
};