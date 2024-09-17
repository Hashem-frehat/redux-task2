// store.js
import { configureStore ,} from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import { thunk } from "redux-thunk";
// إنشاء المتجر مع الجمع بين جميع المخفضات (reducers)
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
  // إعداد أدوات التطوير فقط في بيئة التطوير
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
