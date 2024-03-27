import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define type for item in the cart
interface CartItem {
  id: number; // Unique identifier for the item
}

interface CartState {
  items: CartItem[];
  id: number | null; // Allow id to be null
}

const initialState: CartState = {
  items: [],
  id: null, // Initialize id as null
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (!existingItem) {
        // If the item doesn't already exist in the cart, add it
        state.items.push(newItem);
        console.log(state.items,"0")
      }
    },
    
    removeItem(state, action: PayloadAction<number>) {
      state.items.splice(action.payload ,1   )

      // state.items = state.items.filter(item => item.id === action.payload);
    },
    clearCart(state) {
      state.items = [];
      
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
