'use client';

import CardLayout from '../components/ui/CardLayout';

import { sorce_sans_3 } from '@/app/utils/fonts';
import Image from 'next/image';

import AvatarIcon from '../../../public/icons/avatar.svg';
import CartIcon from '../../../public/icons/cart.svg';
import EyeIcon from '../../../public/icons/eye.svg';
import CopyIcon from '../../../public/icons/copy.svg';

import classes from './page.module.css';
import Button from '../components/ui/Button';
import Account from '../components/modal/Account';
import { useState } from 'react';

export default function AccountPage() {

  // state for layover
  const [layoverState, setLayoverState] = useState(false);
  const toggleLayover = () => {
    setLayoverState(!layoverState);
    console.log(layoverState);
  }



  return (
    <main>
      <CardLayout>
        <div className={classes.account_header_block}>
          <div className={classes.avatar_block}>
            <Image src={AvatarIcon} alt='avatar icon' width={36} />
          </div>
          <h1 className={sorce_sans_3.className}>New User</h1>
        </div>

        <ul className={classes.account__list}>
          <li>
            <p className={classes.field_name}>Address:</p>
            <p className={classes.text_content}>Kulmakatu 47</p>
            <Image src={CartIcon} alt='VarausLista logo' height={15} />
          </li>
          <li>
            <p className={classes.field_name}>Apartment:</p>
            <p className={classes.text_content}>A1</p>
          </li>
          <li>
            <p className={classes.field_name}>Email:</p>
            <p className={classes.text_content}>johanna@gmail.com</p>
          </li>
          <li>
            <p className={classes.field_name}>Password:</p>
            <p className={classes.text_content}>*****</p>
            <Image src={EyeIcon} alt='VarausLista logo' height={18} />
          </li>
          <li>
            <p className={classes.field_name}>Invitation link:</p>
            <p className={classes.text_content}>
              4cae2cc2a0017e88ff4cc7a210051a79
            </p>
            <Image src={CopyIcon} alt='VarausLista logo' height={18} />
          </li>
        </ul>

        <div className={classes.info_block}>
          <p>
            Create account to get access to VarausLista App from multiple
            devices and make reservations faster.
          </p>
        </div>

        <Button name='Create Account' action={toggleLayover}/>
        {layoverState && <Account /> }
        
      </CardLayout>
    </main>
  );
}
