'use client';

import Navbar from '@/app/components/Navbar';
import PopupMenu from '@/app/components/modal/PopupMenu';

import bg from '../../../public/img/bg-img.png';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import StoreProvider from '@/app/StoreProvider';

export default function DashboardLayout({ children }) {
  // state and function for menuModal
  const [menuVisibility, setMenuVisibility] = useState(false);
  const menuToggler = () => {
    setMenuVisibility(!menuVisibility);
    console.log(menuVisibility);
  };

  return (
    <StoreProvider>
      <div className='page' style={{ backgroundImage: `url(${bg.src})` }}>
        <Navbar menuToggler={menuToggler} />
        {children}
      </div>
      <AnimatePresence>
        {menuVisibility && <PopupMenu menuToggler={menuToggler} />}
      </AnimatePresence>
    </StoreProvider>
  );
}
