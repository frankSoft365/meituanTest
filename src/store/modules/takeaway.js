import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const takeawayStore = createSlice({
    name: 'takeaway',
    initialState: {
        foodsList: [],
        activeIndex: 0
    },
    reducers: {
        setFoodsList(state, action) {
            state.foodsList = action.payload;
        },
        setActiveIndex(state, action) {
            state.activeIndex = action.payload
        }
    }
});
const { setFoodsList, setActiveIndex } = takeawayStore.actions;
const fetchFoodsList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3004/takeaway');
        dispatch(setFoodsList(res.data));
    };
};
const reducer = takeawayStore.reducer;
export default reducer;
export { fetchFoodsList, setActiveIndex };