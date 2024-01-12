// payload can be usefull if we need to pass data (e.g. userId)
import { createSlice } from '@reduxjs/toolkit';

// lets keep initialState in a const
const initialState = {
  value: {
    modalIsVisible: false,
    confirmationIsVisible: false,
    menuIsVisible: false,
  },
};

// slice
export const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleModal(state){
      state.value.modalIsVisible = !state.value.modalIsVisible;
    },
    toggleConfirmation(state){
      state.value.confirmationIsVisible = !state.value.confirmationIsVisible;
    },
    toggleMenu(state){
      state.value.menuIsVisible = !state.value.menuIsVisible;
    }
  },
});

// export all the actions
export const { toggleModal, toggleConfirmation, toggleMenu } = ui.actions;
// export reducer
export default ui.reducer;
