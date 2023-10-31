import { createAction, createReducer } from "@reduxjs/toolkit";

export const cartOpened = createAction("OPEN-CART");

const initialState = {
  value: {
    isOpen: false
  },
};

const openCart = createReducer(initialState, {
  [cartOpened]: (state, action) => {
    state.value.isOpen = action.payload;
  },
});

export default openCart;