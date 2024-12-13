import { createSlice } from "@reduxjs/toolkit";

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
    },
});



export const { setUserRole,clearUserRole, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;