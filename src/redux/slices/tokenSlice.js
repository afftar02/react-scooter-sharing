import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: '',
    access_token:'',
    refresh_token:'',
};

const tokenSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setUserId(state, action) {
            state.userId = action.payload;
        },
        setAccess_token(state, action) {
            state.access_token = action.payload;
        },
        setRefresh_token(state, action) {
            state.refresh_token = action.payload;
        },
    },
});

export const { setUserId,setAccess_token,setRefresh_token } = tokenSlice.actions;

export default tokenSlice.reducer;