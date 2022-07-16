import { configureStore } from '@reduxjs/toolkit';
import token from './slices/tokenSlice';
import home from './slices/homeSlice';
import user from './slices/userSlice';
import detailedCard from './slices/detailedCardSlice';
import userScooterCard from './slices/userScooterCardSlice';

export const store = configureStore({
  reducer: {
    token, home, user, detailedCard, userScooterCard,
  },
})