'use client';

import Image from 'next/image';
import Logo from '../../../public/logo/varauslista-logo.svg';
import BurgerMenu from '../../../public/icons/burger-menu.svg';
import Link from 'next/link';

import classes from './Navbar.module.css';

export default function Navbar(props) {


  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <Link href='/'>
            <Image src={Logo} alt='VarausLista logo' width={123} />
          </Link>

          <Image src={BurgerMenu} alt='menu' height={24} onClick={props.menuToggler} className='img_btn'/>
        </nav>
      </header>
    </>
  );
}
