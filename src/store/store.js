import { configureStore } from '@reduxjs/toolkit';

import restaurantsSlice from './allRestaurantsSlice';
import restaurantById from "./restaurantByIdSlice"
import loginSlice from "./loginSlice"

const store = configureStore({
  reducer: {
    restaurants: restaurantsSlice.reducer,
    login: loginSlice.reducer,
    restaurantById:restaurantById.reducer
  },
});

export default store;