import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui_slice";

export const makeStore = configureStore({
    reducer: {ui: uiSlice.reducer}
});

// export default store;