import { createSlice } from "@reduxjs/toolkit";

const cartStore = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addFood(state, action) {
            const item = state.cart.find(item => item.id === action.payload.id)
            if (item) {
                item.count++;
            } else {
                state.cart.push(action.payload);
            }
        },
        removeFood(state, action) {
            const item = state.cart.find(item => item.id === action.payload.id)
            if (item.count === 1) {
                state.cart = state.cart.filter(item => item.id !== action.payload.id)
            } else {
                item.count--;
            }
        },
        removeTotalFood(state) {
            state.cart = [];
        }
    }
});

const reducer = cartStore.reducer;
const { addFood, removeFood, removeTotalFood } = cartStore.actions;

export default reducer;
export { addFood, removeFood, removeTotalFood };