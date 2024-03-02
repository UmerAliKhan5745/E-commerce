import { configureStore } from '@reduxjs/toolkit'
import {cartSlice} from '../store/slices/cartSlices'
export const store=configureStore({
    reducer:{
        cart:cartSlice.reducer
    }
})