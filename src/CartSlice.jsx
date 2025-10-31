import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // addItem reducer - adds a new plant item to the items array
    addItem: (state, action) => {
      const newItem = action.payload;
      // Check if item already exists in cart by name
      const existingItem = state.items.find(item => item.name === newItem.name);
      
      if (existingItem) {
        // If item exists, increase quantity by 1
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it with quantity 1
        state.items.push({
          ...newItem,
          quantity: 1
        });
      }
    },
    
    // removeItem reducer - removes an item from the cart based on its name
    removeItem: (state, action) => {
      const itemName = action.payload.name;
      // Filter out the item with the matching name
      state.items = state.items.filter(item => item.name !== itemName);
    },
    
    // updateQuantity reducer - updates the quantity of an existing item
    updateQuantity: (state, action) => {
      // Extract the item's name and quantity from the action.payload
      const { name, quantity } = action.payload;
      
      // Find the item in the state.items array that matches the extracted name
      const item = state.items.find(item => item.name === name);
      
      // If the item is found, update its quantity to the new amount
      if (item) {
        item.quantity = quantity;
        
        // Optional: Remove item if quantity becomes 0 or less
        if (item.quantity <= 0) {
          state.items = state.items.filter(cartItem => cartItem.name !== name);
        }
      }
    },
  },
});

// Export the action creators
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as default to use in store.js
export default CartSlice.reducer;