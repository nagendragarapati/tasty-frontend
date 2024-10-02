import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    restaurant: {},
};

export const restaurantByIdSlice=createSlice({
    name:'restaurantById',
    initialState,
    reducers:{
        setRestaurantById:(state,action)=>{
            state.restaurant=action.payload

        }
    }
})

export const restaurantByIdActions=restaurantByIdSlice.actions

export default restaurantByIdSlice

