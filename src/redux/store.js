import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './features/ui-slice';

export const store = configureStore({
    reducer: {
        uiReducer
    }
});