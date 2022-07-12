import { configureStore } from '@reduxjs/toolkit';
import token from './slices/tokenSlice';
import home from './slices/homeSlice';
import user from './slices/userSlice';

export const store = configureStore({
  reducer: {
    token, home, user,
  },
})