import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState: {
        userData: null,
        role: null
    },
    reducers:{
        setUserRole: (state,action) => {
            state.role = action.payload;
        },
        setUser: (state,action) => {
            state.userData = action.payload;
        },
        clearUser: (state) => {
            state.userData = null;
        },
    },
});

export const { setUserRole, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;