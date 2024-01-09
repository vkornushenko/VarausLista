import { configureStore } from "@reduxjs/toolkit";
// import slices
import uiReducer from './features/ui-slice';
import userReducer from './features/user-slice';

export const store = configureStore({
    reducer: {
        uiReducer,
        userReducer
    }
});