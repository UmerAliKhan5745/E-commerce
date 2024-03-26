import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define type for item in the cart
interface CartItem {
  id: number; // Unique identifier for the item
  // Add other properties as needed
}

// Define type for the initial state
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        // If the item already exists in the cart, increment its quantity
        existingItem.quantity++;
      } else {
        // Otherwise, add the item to the cart with a quantity of 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
