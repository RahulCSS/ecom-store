import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { UpdateCart, UpdateWishlist } from "../apicalls/user";

const findProductInCart = (cart, productId) => {
    return cart.find(item => item.productId.toString() === productId);
  };

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
            const newState = { ...state };
            newState.id = action.payload._id;
            newState.name = action.payload.name;
            newState.email = action.payload.email;
            newState.phone_number = action.payload.phone_number;
            newState.address = action.payload.address;
            newState.role = action.payload.role;
            newState.status = action.payload.status;
            newState.token = action.payload.token;

            if (action.payload.wishlist) {
                const newWishlist = action.payload.wishlist.filter((item) => {
                return !state.wishlist.includes(item);
                });
                newState.wishlist = [...state.wishlist, ...newWishlist];
            }

            if (action.payload.cart) {
                const newCart = action.payload.cart.filter((item) => {
                  return !state.cart.some((existingItem) => existingItem.productId === item.productId);
                });
                newState.cart = state.cart.map((existingItem) => {
                  const newItem = newCart.find((newItem) => newItem.productId === existingItem.productId);
                  if (newItem) {
                    return { ...existingItem, quantity: newItem.quantity };
                  }
                  return existingItem;
                }).concat(newCart.filter((item) => {
                  return !state.cart.some((existingItem) => existingItem.productId === item.productId);
                }));
              }

            return newState;
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
                const newWishlist = state.wishlist.filter((item) => item.toString() !== productId);
                return {
                    ...state,
                    wishlist: newWishlist,
                };
            } else {
                return {
                    ...state,
                    wishlist: [...state.wishlist, productId],
                };
            }
        },

        addtoCart: (state, action) => {
            const productId = action.payload;
            const existingProduct = findProductInCart(state.cart, productId);
            if (existingProduct) {
                return {
                    ...state,
                    cart: state.cart.map(item => item.productId.toString() === productId ? { ...item, quantity: item.quantity + 1 } : item)
                  };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { productId, quantity: 1 }]
                  };
                };
        },
        removefromCart: (state, action) => {
            const productId = action.payload;
            const existingProduct = findProductInCart(state.cart, productId);
            if (existingProduct && existingProduct.quantity > 1) {
                return {
                    ...state,
                    cart: state.cart.map(item => item.productId.toString() === productId ? { ...item, quantity: item.quantity - 1 } : item)
                  };
            }else{
                return {
                    ...state,
                    cart: state.cart.filter(item => item.productId.toString() !== productId)
                  };
            }
        },
        deletefromCart: (state, action) => {
            const productId = action.payload;
            return {
                ...state,
                cart: state.cart.filter(item => item.productId.toString() !== productId)
              };
        },
        emptyCart: (state) => {
            return { ...state, cart: [] };
        },
    },
});

export const updateCart = (id,payload) => async (dispatch) => {
    console.log(id);
    console.log(payload);
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