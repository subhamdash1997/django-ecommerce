import { configureStore } from "@reduxjs/toolkit";
import {
  productsListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import { userLoginReducers, userSignupReducers } from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    productList: productsListReducer,
    productDetails: productDetailsReducer,
    userLogin: userLoginReducers,
    userSignup: userSignupReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
