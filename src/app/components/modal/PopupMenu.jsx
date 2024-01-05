'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import Logo from '../../../../public/logo/varauslista-logo.svg';
import CloseIcon from '../../../../public/icons/close.svg';

import { sorce_sans_3 } from '../../utils/fonts';

import Link from 'next/link';
import classes from './PopupMenu.module.css';


export default function PopupMenu(props) {

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
            onClick={props.toggleMenu}
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
                onClick={props.toggleMenu}
                className='img_btn'
              />
            </header>
            <nav>
              <ul className={classes.menu_list}>
                <li>
                  <Link
                    href='/'
                    className={sorce_sans_3.className + ' ' + classes.link}
                    onClick={props.toggleMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href='/reservation'
                    className={sorce_sans_3.className + ' ' + classes.link}
                    onClick={props.toggleMenu}
                  >
                    Check Reservations
                  </Link>
                </li>
                <li>
                  <Link
                    href='/account'
                    className={sorce_sans_3.className + ' ' + classes.link}
                    onClick={props.toggleMenu}
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    href='/faq'
                    className={sorce_sans_3.className + ' ' + classes.link}
                    onClick={props.toggleMenu}
                  >
                    How to use
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
    </>
  );
}
