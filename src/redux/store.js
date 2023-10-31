import userReducer from "./user";
import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import registerReducer from "./registered";
import openCart from "./openCart";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    registered: registerReducer,
    openCart: openCart
  }
})

export default store 