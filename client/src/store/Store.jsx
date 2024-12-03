import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './ModalSlice'

export const store = configureStore({
    reducer: {
        modal: modalReducer,
    },
});

export default store;