import { createSlice } from "@reduxjs/toolkit";
import { UpdateCart, UpdateWishlist} from "../apicalls/user";

const userSlice = createSlice({
    name:'user',
    initialState: {
        id: null,
        name: null,
        email: null,
        phone_number: null,
        address: null,
        role: null,
        status: null,
        token: null,
        wishlist: [],
        cart: [],
        userRole: null,
    },
    reducers:{
        setUserRole: (state,action) => {
            state.userRole = action.payload;
        },
        clearUserRole: (state) => {
            state.userRole = null;
        },
        setUser: (state,action) => {
            state.id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone_number = action.payload.phone_number;
            state.address = action.payload.address;
            state.role = action.payload.role;
            state.status = action.payload.status;
            state.token = action.payload.token;
            state.wishlist = action.payload.wishlist;
            state.cart = action.payload.cart;
        },
        clearUser: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.phone_number = null;
            state.address = null;
            state.role = null;
            state.status = null;
            state.token = null;
            state.wishlist = [];
            state.cart = [];
        },
        addremoveWish : (state,action) => { 
            const productId = action.payload;
            const existing = state.wishlist.find(item => item.toString() === productId);
            if (existing) {
                state.wishlist = state.wishlist.filter((item) => item.toString() !== productId);
            } else {
                state.wishlist.push(productId); 
            }
            UpdateWishlist(state.id, state.wishlist);
        },

        addtoCart: (state, action) => {
            const productId = action.payload;
            const existingProduct = state.cart.find(item => item.productId.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.cart.push({ productId, quantity: 1 });
            }
            UpdateCart(state.id, state.cart); 
        },
        removefromCart: (state, action) => {
            const productId = action.payload;
            const existingProduct= state.cart.find(item => item.productId.toString() === productId);
            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
            }else{
                state.cart = state.cart.filter(item => item.productId.toString() !== productId);
            }
            UpdateCart(state.id, state.cart); 
        },
        deletefromCart: (state, action) => {
            const productId = action.payload;
            state.cart = state.cart.filter(item => item.productId.toString() !== productId);
            UpdateCart(state.id, state.cart); 
        },
        emptyCart: (state) => {
            state.cart = [];
            UpdateCart(state.id, state.cart);
        },
    },
});

export const updateCart = (id,payload) => async (dispatch) => {
    try {
      const response = await UpdateCart(id, payload);
      if (response.success) {
        message.success(response.message);
      }else{
        message.error(response.message);
      }
    } catch (error) {
        message.error(error.message);
    }
};

export const updateWishlist = (id,payload) => async (dispatch) => {
    try {
      const response = await UpdateWishlist(id,payload);
      if (response.success) {
        message.success(response.message);
      }else{
        message.error(response.message);
      }
    } catch (error) {
        message.error(error.message);
    }
  };

export const { setUserRole,clearUserRole, setUser, clearUser, addremoveWish, addtoCart, removefromCart, deletefromCart, emptyCart } = userSlice.actions;
export default userSlice.reducer;