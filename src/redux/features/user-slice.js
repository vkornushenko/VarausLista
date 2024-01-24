// payload can be usefull if we need to pass data (e.g. userId)
import { createSlice } from '@reduxjs/toolkit';

// lets keep initialState in a const
const initialState = {
  name: undefined,
  address_id: undefined,
  address: undefined,
  apartment: undefined,
  email: undefined,
  password: undefined,
  user_id: undefined
};

// slice
export const user = createSlice({
  name: 'user',
  //initialState: { modalIsVisible: false, confirmationIsVisible: false },
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.address_id = action.payload.address_id
      state.address = action.payload.address;
      state.apartment = action.payload.apartment;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.user_id = action.payload.user_id;
    },
    unsetUser(state) {
      state.name = initialState.name;
      state.address_id = initialState.address_id;
      state.address = initialState.address;
      state.apartment = initialState.apartment;
      state.email = initialState.email;
      state.password = initialState.password;
      state.user_id = initialState.user_id;
    }
  },
});

// export all the actions
export const { setUser, unsetUser } = user.actions;
// export reducer
export default user.reducer;
