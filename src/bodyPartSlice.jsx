import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedBodyPart: ''
};

const questionBodyPartSlice = createSlice({
  name: 'questionBodyPart',
  initialState,
  reducers: {
    setSelectedBodyPart(state, action) {
      state.selectedBodyPart = action.payload;
    },
  },
});

export const { setSelectedBodyPart } = questionBodyPartSlice.actions;

export default questionBodyPartSlice.reducer;
