'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../redux/store';
// slices
import { setUser } from '../redux/features/user-slice';

export default function StoreProvider({ children, userData }) {
  const storeRef = useRef(null);
  // console.log('hello from the StoreProvider component');
  // console.log('storeRef.current val is: ' + storeRef.current);
  if (!storeRef.current) {
    // console.log('makeStore function was triggered!!!');
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  // get data from supabase via props
  // and initializing store with this data
  // console.log(
  //   'This userData is going to be set to the store (StoreProvider.jsx file:)'
  // );
  // console.log(userData);
  storeRef.current.dispatch(setUser(userData));
  return <Provider store={storeRef.current}>{children}</Provider>;
}
