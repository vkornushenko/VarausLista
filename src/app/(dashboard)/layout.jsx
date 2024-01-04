'use client';

// supabase
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

import Navbar from '@/app/components/Navbar';
import PopupMenu from '@/app/components/modal/PopupMenu';

import bg from '../../../public/img/bg-img.png';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }) {
  // // supabase
  // const supabase = createServerComponentClient({ cookies });
  // const { data } = await supabase.auth.getSession();

  // state and function for menuModal
  const [menuVisibility, setMenuVisibility] = useState(false);
  const menuToggler = () => {
    setMenuVisibility(!menuVisibility);
    console.log(menuVisibility);
  };

  return (
    <>
      <div className='page' style={{ backgroundImage: `url(${bg.src})` }}>
        <Navbar menuToggler={menuToggler} />
        {children}
      </div>
      <AnimatePresence>
        {menuVisibility && <PopupMenu menuToggler={menuToggler} />}
      </AnimatePresence>
    </>
  );
}
