import { configureStore } from '@reduxjs/toolkit';

import restaurantsSlice from './allRestaurantsSlice';
import loginSlice from "./loginSlice"

const store = configureStore({
  reducer: {
    restaurants: restaurantsSlice.reducer,
    login: loginSlice.reducer
  },
});

export default store;