import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const stop = createAsyncThunk('userScooterCard/stop', async (info, { getState }) => {
    const userId = getState().token.userId;
    const { id, locationName, locationDescription } = info;
    
    await axios({
        method: 'put',
        url: `http://localhost:8080/scooter-sharing/api/scooters`,
        headers: {
            Authorization: getState().token.access_token
        },
        data: {
            id, "location": { "name": locationName, "description": locationDescription }, "booked": false, "timeLeft": 0
        }
    });
    const userResponse = await axios({
        method: 'get',
        url: `http://localhost:8080/scooter-sharing/api/user/${userId}`,
        headers: {
            Authorization: getState().token.access_token
        }
    });
    const updatedUserScooters = userResponse.data.scooters.filter(scooter => scooter.id !== id);
    await axios({
        method: 'put',
        url: `http://localhost:8080/scooter-sharing/api/user`,
        headers: {
            Authorization: getState().token.access_token
        },
        data: {
            "id": userId, "scooters": updatedUserScooters
        }
    });
    return updatedUserScooters;
})

const initialState = {
    locationName: '',
    locationDescription: '',
};

const userScooterCardSlice = createSlice({
    name: 'userScooterCard',
    initialState,
    reducers: {
        setLocationName(state, action) {
            state.locationName = action.payload;
        },
        setLocationDescription(state, action) {
            state.locationDescription = action.payload;
        },
    },
});

export const { setLocationName, setLocationDescription } = userScooterCardSlice.actions;

export default userScooterCardSlice.reducer;