import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:'modal',
    initialState: {
        isLoginModalOpen: false,
        isSignupModalOpen: false,
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
    },
});

export const { showLoginModal,hideLoginModal,showSignupModal,hideSignupModal} = modalSlice.actions;
export default modalSlice.reducer;