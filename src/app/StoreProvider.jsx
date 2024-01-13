'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../redux/store';
// slices
import { setUser } from '../redux/features/user-slice';

export default function StoreProvider({ children, userData }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();

    // get data from supabase via props
    // and initializing store with this data
    storeRef.current.dispatch(setUser(userData));
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
