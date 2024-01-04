// payload can be usefull if we need to pass data (e.g. userId)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// lets keep initialState in a const
const initialState = {
  value: {
    modalIsVisible: false,
    confirmationIsVisible: false,
  },
};

// slice
export const ui = createSlice({
  name: 'ui',
  //initialState: { modalIsVisible: false, confirmationIsVisible: false },
  initialState,
  reducers: {
    // // example of action with payload
    // logIn : (state, action) => {
    //   return {
    //     value: {
    //       isAuth: true,
    //       username: action.payload,
    //       uid: shdAgJhakhyd62,
    //       isModerator: false
    //     }
    //   }
    // },

    // toggle action
    // note: we are not returning anything here, cause redux will
    // understand behind the scines how to work with this type of
    // state mutation (!!! but we cant set state = 'some variable')
    toggleModal: (state) => {
      state.value.modalIsVisible = !state.value.modalIsVisible;
    },
    // another toggle action
    toggleConfirmation(state) {
      state.value.confirmationIsVisible = !state.value.confirmationIsVisible;
    },
  },
});

// export all the actions
export const { toggleModal, toggleConfirmation } = ui.actions;
// export reducer
export default ui.reducer;
