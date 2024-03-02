import {createSlice} from '@reduxjs/toolkit'
const initialState:any={
    value:0
}
export const cartSlice=createSlice({
    name :"cart",
    initialState,
    reducers:{
        addToCart:(state)=>{
            state.value+=1
        },
        removeFromCart:(state,action)=>{
        }
    }
    
})
console.log(cartSlice.actions)
export const { addToCart } = cartSlice.actions

export default cartSlice;


