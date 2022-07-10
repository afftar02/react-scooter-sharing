import { configureStore } from '@reduxjs/toolkit';
import token from './slices/tokenSlice';

export const store = configureStore({
  reducer: {
    token,
  },
})