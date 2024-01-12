// payload can be usefull if we need to pass data (e.g. userId)
import { createSlice } from '@reduxjs/toolkit';

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
    setUser(state, action) {
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.apartment = action.payload.apartment;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    unsetUser(state) {
      state.name = initialState.name;
      state.address = initialState.address;
      state.apartment = initialState.apartment;
      state.email = initialState.email;
      state.password = initialState.password;
    }
  },
});

// export all the actions
export const { setUser, unsetUser } = user.actions;
// export reducer
export default user.reducer;
