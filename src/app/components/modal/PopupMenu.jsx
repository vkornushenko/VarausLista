'use client';

import Image from 'next/image';
import Link from 'next/link';
// hooks
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
// style
import classes from './PopupMenu.module.css';
import { sorce_sans_3 } from '../../utils/fonts';
import CloseIcon from '../../../../public/icons/close.svg';
import Logo from '../../../../public/logo/varauslista-logo.svg';
// components
import LogOut from './LogOut';

export default function PopupMenu({toggleMenu}) {
  // selector for userData from the Store
  const userData = useSelector((state) => state.userReducer);

  // console.log('userData from the store (PopupMenu component)');
  // console.log(userData);

  return (
    <>
      <motion.div
        className={classes.backdrop}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 100 },
        }}
        initial='hidden'
        animate='visible'
        exit='hidden'
        onClick={toggleMenu}
      ></motion.div>
      <motion.div
        className={classes.menu}
        variants={{
          hidden: { opacity: 100, x: -200 },
          visible: { opacity: 100, x: 0 },
        }}
        transition={{ ease: 'easeOut', stiffness: 500 }}
        initial='hidden'
        animate='visible'
        exit='hidden'
      >
        <header className={classes.header}>
          <Link href='/'>
            <Image src={Logo} alt='VarausLista logo' width={123} />
          </Link>
          <Image
            src={CloseIcon}
            alt='Close Menu'
            width={19}
            onClick={toggleMenu}
            className='img_btn'
          />
        </header>
        <nav>
          <ul className={classes.menu_list}>
            <li>
              <Link
                href='/'
                className={sorce_sans_3.className + ' ' + classes.link}
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/reservation'
                className={sorce_sans_3.className + ' ' + classes.link}
                onClick={toggleMenu}
              >
                Check Reservations
              </Link>
            </li>
            <li>
              <Link
                href='/account'
                className={sorce_sans_3.className + ' ' + classes.link}
                onClick={toggleMenu}
              >
                Account
              </Link>
            </li>
            {/* <li>
                  <Link
                    href='/faq'
                    className={sorce_sans_3.className + ' ' + classes.link}
                    onClick={toggleMenu}
                  >
                    How to use
                  </Link>
                </li> */}
            {userData?.email && (
              <li>
                <LogOut toggleMenu={toggleMenu} />
              </li>
            )}
          </ul>
        </nav>
      </motion.div>
    </>
  );
}
