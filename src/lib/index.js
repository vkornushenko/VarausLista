import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui_slice";

const store = configureStore({
    reducer: {ui: uiSlice.reducer}
});

export default store;