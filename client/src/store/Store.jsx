import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './ModalSlice'
import userReducer from './UserSlice'

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        user: userReducer,
    },
});

export default store;