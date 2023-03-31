import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  diagnose: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DIAGNOSE':
      return { ...state, diagnose: action.payload };
    default:
      return state;
  }
};

const store2 = configureStore({
  reducer,
});

export const setDiagnose = (diagnose) => {
  return { type: 'SET_DIAGNOSE', payload: diagnose };
};

export default store2;
