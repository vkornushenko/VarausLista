const { createSlice } = require("@reduxjs/toolkit");

const uiSlice = createSlice({
    name: 'ui',
    initialState: { modalIsVisible: false, confirmationIsVisible: false },
    reducers: {
        toggleModal(state){
            state.modalIsVisible = !state.modalIsVisible
        },
        toggleConfirmation(state){
            state.confirmationIsVisible = !state.confirmationIsVisible
        },
        // toggleMenu(state){
        //     state.menuIsVisible = !state.menuIsVisible
        // }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;