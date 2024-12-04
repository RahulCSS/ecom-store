import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:'modal',
    initialState: {
        isLoginModalOpen: false,
        isSignupModalOpen: false,
        user: null,
        userName: null,
        userRole: null,
    },
    reducers:{
        showLoginModal(state){
            state.isLoginModalOpen = true;
        },
        hideLoginModal(state){
            state.isLoginModalOpen = false;
        },
        showSignupModal: (state) => {
            state.isSignupModalOpen = true;
        },
        hideSignupModal: (state) => {
            state.isSignupModalOpen = false;
        },
        setUserRole: (state,action) => {
            state.userRole = action.payload;
        },
        setUser: (state,action) => {
            state.user = action.payload;
            state.userRole = action.payload.role;
            state.userName = action.payload.name;
        },
        clearUser: (state) => {
            state.user = null;
            state.userRole = null;
            state.userName = null;
        },
    },
});

export const { showLoginModal,hideLoginModal,showSignupModal,hideSignupModal,setUserRole, setUser, clearUser} = modalSlice.actions;
export default modalSlice.reducer;