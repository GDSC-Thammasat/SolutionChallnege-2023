import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  bodyPart: '',
  diagnoseScore: '',
  stretchScore: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BODY_PART':
      return { ...state, bodyPart: action.payload };

    case 'SET_DIAGNOSE_SCORE':
    return { ...state, diagnoseScore: action.payload };

    case 'SET_STRETCH_SCORE':
    return { ...state, stretchScore: action.payload };

    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

export const setBodyPart = (bodyPart) => {
  return { type: 'SET_BODY_PART', payload: bodyPart };
};

export const setDiagnoseScore = (diagnoseScore) => {
  return { type: 'SET_DIAGNOSE_SCORE', payload: diagnoseScore };
};

export const setStretchScore = (stretchScore) => {
  return { type: 'SET_STRETCH_SCORE', payload: stretchScore};
};

export default store;