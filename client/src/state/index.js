import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      const itemToAdd = action.payload.item;
      if (!itemToAdd || !itemToAdd.id) {
        console.error("Invalid item payload", action.payload);
        return;
      }
      const existingItem = state.cart.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        // Item already in cart, update the count
        state.cart = state.cart.map(item =>
          item.id === itemToAdd.id
            ? { ...item, count: item.count + itemToAdd.count }
            : item
        );
      } else {
        // Item not in cart, add it
        state.cart = [...state.cart, itemToAdd];
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
