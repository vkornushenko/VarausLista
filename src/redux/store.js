import { configureStore } from '@reduxjs/toolkit';

// import slices
import uiReducer from './features/ui-slice';
import userReducer from './features/user-slice';

// defining a makeStore function that returns a new store for each request
export const makeStore = () => {
  return configureStore({
    reducer: {
      uiReducer,
      userReducer,
    }
  });
};
