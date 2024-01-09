// payload can be usefull if we need to pass data (e.g. userId)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// lets keep initialState in a const
const initialState = {
  name: undefined,
  address: undefined,
  apartment: undefined,
  email: undefined,
  password: undefined,
};

// slice
export const user = createSlice({
  name: 'user',
  //initialState: { modalIsVisible: false, confirmationIsVisible: false },
  initialState,
  reducers: {
    setUser(state, action){
        state.name = action.payload.name;
        state.address = action.payload.address;
        state.apartment = action.payload.apartment;
        state.email = action.payload.email;
        state.password = action.payload.password;
    }

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
    // toggleModal(state){
    //   state.value.modalIsVisible = !state.value.modalIsVisible;
    // },
    // another toggle action
    // toggleConfirmation: (state) => {
    //   state.value.confirmationIsVisible = !state.value.confirmationIsVisible;
    // },
    // toggleMenu: (state) => {
    //   state.value.menuIsVisible = !state.value.menuIsVisible;
    // },
  },
});

// export all the actions
export const { setUser } = user.actions;
// export reducer
export default user.reducer;
