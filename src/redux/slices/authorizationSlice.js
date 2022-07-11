import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    password: '',
};

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setUsername(state, action) {
            state.username = action.payload;
        },
        setPassword(state, action) {
            state.password = action.payload;
        },
    },
});

export const { setUsername, setPassword } = authorizationSlice.actions;

export default authorizationSlice.reducer;