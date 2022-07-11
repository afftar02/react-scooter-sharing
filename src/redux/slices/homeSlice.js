import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    itemChosen: '',
    items: [],
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setItemChosen(state, action) {
            state.itemChosen = action.payload;
        },
        setItems(state, action) {
            state.items = action.payload;
        },
    },
});

export const { setItemChosen, setItems } = homeSlice.actions;

export default homeSlice.reducer;