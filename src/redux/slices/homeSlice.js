import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setItemsFromServer = createAsyncThunk('home/setItemsFromServer', async (arg, { getState, dispatch }) => {
    const scootersResponse = await axios({
        method: 'get',
        url: `http://localhost:8080/scooter-sharing/api/scooters`,
        headers: {
            Authorization: getState().token.access_token
        }
    });
    dispatch(setItems(scootersResponse.data));
})

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