import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userItems: [],
    userName: '',
    userEmail: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserItems(state, action) {
            state.userItems = action.payload;
        },
        setUserName(state, action) {
            state.userName = action.payload;
        },
        setUserEmail(state, action) {
            state.userEmail = action.payload;
        },
    },
});

export const { setUserItems, setUserName, setUserEmail } = userSlice.actions;

export default userSlice.reducer;