import { configureStore } from "@reduxjs/toolkit";
import takeawyReducer from './modules/takeaway';
import cartReducer from './modules/cart';

const store = configureStore({
    reducer: {
        takeaway: takeawyReducer,
        cart: cartReducer,
    }
});
export default store;