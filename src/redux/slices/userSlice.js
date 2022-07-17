import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserInfo = createAsyncThunk('user/getUserInfo', async (arg, { getState, dispatch }) => {
    const userId = getState().token.userId;
    const userResponse = await axios({
        method: 'get',
        url: `http://localhost:8080/scooter-sharing/api/user/${userId}`,
        headers: {
            Authorization: getState().token.access_token
        }
    });
    dispatch(setUserName(userResponse.data.firstName + " " + userResponse.data.secondName));
    dispatch(setUserEmail(userResponse.data.username));
    if (userResponse.data.scooters.length > 0) {
        dispatch(setUserItems(userResponse.data.scooters));
    }
})

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