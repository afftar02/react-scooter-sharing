import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const start = createAsyncThunk('detailedCard/start', async (info, { getState }) => {
    const userId = getState().token.userId;
    const rentalTime = getState().detailedCard.rentalTime;
    const { id, imageUrl, modelName, location, battery } = info;

    const scooterResponse = await axios({
        method: 'get',
        url: `http://localhost:8080/scooter-sharing/api/scooters/${id}`,
        headers: {
            Authorization: getState().token.access_token
        }
    });
    let countedRentalTime = getState().detailedCard.timeUnitList[getState().detailedCard.selectedTimeUnit] === "min" ? rentalTime : (rentalTime * 60);//time in min
    await axios({
        method: 'put',
        url: `http://localhost:8080/scooter-sharing/api/scooters`,
        headers: {
            Authorization: getState().token.access_token
        },
        data: {
            id, "location": { "id": scooterResponse.data.location.id, "name": location.name, "description": location.description }, battery, imageUrl, modelName, "booked": true, "timeLeft": countedRentalTime
        }
    });
    const userResponse = await axios({
        method: 'get',
        url: `http://localhost:8080/scooter-sharing/api/user/${userId}`,
        headers: {
            Authorization: getState().token.access_token
        }
    });
    axios({
        method: 'put',
        url: `http://localhost:8080/scooter-sharing/api/user`,
        headers: {
            Authorization: getState().token.access_token
        },
        data: {
            "id": userId, "scooters": [...userResponse.data.scooters, scooterResponse.data]
        }
    });
})

const initialState = {
    rentalTime: 0,
    selectedTimeUnit: 0,
    timeUnitList: ["min", "h"],
};

const detailedCardSlice = createSlice({
    name: 'detailedCard',
    initialState,
    reducers: {
        setRentalTime(state, action) {
            state.rentalTime = action.payload;
        },
        setSelectedTimeUnit(state, action) {
            state.selectedTimeUnit = action.payload;
        },
    },
});

export const { setRentalTime, setSelectedTimeUnit } = detailedCardSlice.actions;

export default detailedCardSlice.reducer;