import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    password: '',
    firstName:'',
    secondName: '',
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setUsername(state, action) {
            state.username = action.payload;
        },
        setPassword(state, action) {
            state.password = action.payload;
        },
        setFirstName(state, action) {
            state.firstName = action.payload;
        },
        setSecondName(state, action) {
            state.secondName = action.payload;
        },
    },
});

export const { setUsername, setPassword, setFirstName, setSecondName } = registrationSlice.actions;

export default registrationSlice.reducer;