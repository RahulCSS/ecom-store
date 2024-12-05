import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState: {
        user: null,
        role: null,
        name: null,
    },
    reducers:{
        setUserRole: (state,action) => {
            state.role = action.payload;
        },
        setUser: (state,action) => {
            state.user = action.payload;
            state.role = action.payload.role;
            state.name = action.payload.name;
        },
        clearUser: (state) => {
            state.user = null;
            state.role = null;
            state.name = null;
        },
    },
});

export const { setUserRole, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;