import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './ModalSlice'
import userReducer from './UserSlice'
import productReducer from './ProductSlice'

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        user: userReducer,
        product: productReducer,
    },
});

export default store;