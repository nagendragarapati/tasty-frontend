import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    restaurants: [],
    restaurantSearchText:''
};

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },

    setRestaurantSearchText:(state,action)=>{
      state.restaurantSearchText=action.payload
    }
    // Add other reducers as needed
  },
});

export const restaurantsActions = restaurantsSlice.actions;
export default restaurantsSlice;