import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openSlider: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setOpenSlider: (state, action) => {
      state.openSlider = true;
    },
    setCloseSlider: (state, action) => {
      state.openSlider = false;
    },
    // Add other reducers as needed
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;