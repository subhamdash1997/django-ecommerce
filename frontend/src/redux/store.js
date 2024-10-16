import { configureStore } from "@reduxjs/toolkit";
import {
  productsListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    productList: productsListReducer,
    productDetails: productDetailsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
