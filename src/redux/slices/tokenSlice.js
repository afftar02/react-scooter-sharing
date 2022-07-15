import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const refreshTokens = createAsyncThunk('tokens/refreshTokens', async (arg, { getState, dispatch }) => {
    try {
        const { data } = await axios({
            method: 'get',
            url: `http://localhost:8080/scooter-sharing/api/token/refresh`,
            headers: {
                Authorization: getState().token.refresh_token
            }
        });
        dispatch(setAccess_token("Bearer " + data.access_token));
        dispatch(setRefresh_token("Bearer " + data.refresh_token));
    } catch (error) {
        alert('Token refreshing error!');
    }
})

const initialState = {
    userId: '',
    access_token: '',
    refresh_token: '',
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

export const { setUserId, setAccess_token, setRefresh_token } = tokenSlice.actions;

export default tokenSlice.reducer;