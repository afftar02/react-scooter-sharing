import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
});

export const { setItems } = homeSlice.actions;

export default homeSlice.reducer;