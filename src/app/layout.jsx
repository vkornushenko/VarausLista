'use client';

// fonts
import { source_serif_4 } from './utils/fonts';
// style
import './globals.css';
// component
import Navbar from './components/Navbar';

import bg from '../../public/img/bg-img.png';
import { useState } from 'react';
import PopupMenu from './components/modal/PopupMenu';
import { AnimatePresence } from 'framer-motion';

// redux toolkit
// import { Provider } from 'react-redux';
// import { makeStore } from '@/lib';
import StoreProvider from './StoreProvider';

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({ children }) {
  
  // state and function for menuModal
  const [menuVisibility, setMenuVisibility] = useState(false);
  const menuToggler = () => {
    setMenuVisibility(!menuVisibility);
    console.log(menuVisibility);
  };

  return (
    <html lang='en'>
      <body className={source_serif_4.className}>
        <StoreProvider>
          <div className='page' style={{ backgroundImage: `url(${bg.src})` }}>
            <Navbar menuToggler={menuToggler} />
            {children}
          </div>
          <AnimatePresence>
            {menuVisibility && <PopupMenu menuToggler={menuToggler} />}
          </AnimatePresence>
        </StoreProvider>
      </body>
    </html>
  );
}
