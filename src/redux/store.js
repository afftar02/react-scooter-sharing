import { configureStore } from '@reduxjs/toolkit';
import token from './slices/tokenSlice';
import home from './slices/homeSlice';
import authorization from './slices/authorizationSlice';
import registration from './slices/registrationSlice';
import user from './slices/userSlice';

export const store = configureStore({
  reducer: {
    token, home, authorization, registration, user,
  },
})