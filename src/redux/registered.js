import { createAction, createReducer } from "@reduxjs/toolkit";

export const registeredUser = createAction("REGISTERED-USER");

const initialState = {
  value: {
    isRegistered: false
  },
};

const registerReducer = createReducer(initialState, {
  [registeredUser]: (state, action) => {
    state.value.isRegistered = action.payload;
  },
});

export default registerReducer;