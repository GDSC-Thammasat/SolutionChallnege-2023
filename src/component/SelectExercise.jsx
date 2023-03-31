import React from "react";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0
};

export const SelectExercise = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});

export const { increment, decrement } = SelectExercise.actions;
export default SelectExercise.reducer;
