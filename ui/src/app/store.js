import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "./customersReducer";
import productsReducer from "./productsReducer";
import storesReducer from "./storesReducer";
import salesReducer from "./salesReducer";

export default configureStore({
  reducer: {
    customersReducer: customersReducer,
    productsReducer: productsReducer,
    storesReducer: storesReducer,
    salesReducer: salesReducer,
  },
});
