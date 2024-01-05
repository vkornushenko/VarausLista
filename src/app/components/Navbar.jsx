'use client';

import Image from 'next/image';
import Logo from '../../../public/logo/varauslista-logo.svg';
import BurgerMenu from '../../../public/icons/burger-menu.svg';
import Link from 'next/link';

// for conditionally hide component with effect (not instantly)
import { AnimatePresence } from 'framer-motion';

import classes from './Navbar.module.css';
import PopupMenu from '@/app/components/modal/PopupMenu';

// redux
import { toggleMenu } from '@/redux/features/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar(props) {
  // redux
  const dispatch = useDispatch();
  // handler with redux
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  // selector with redux
  const menuIsVisible = useSelector(
    (state) => state.uiReducer.value.menuIsVisible
  );

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <Link href='/'>
            <Image src={Logo} alt='VarausLista logo' width={123} />
          </Link>
          <Image
            src={BurgerMenu}
            alt='menu'
            height={24}
            onClick={toggleMenuHandler}
            className='img_btn'
          />
        </nav>
      </header>
      <AnimatePresence>
        {menuIsVisible && <PopupMenu toggleMenu={toggleMenuHandler} />}
      </AnimatePresence>
    </>
  );
}
