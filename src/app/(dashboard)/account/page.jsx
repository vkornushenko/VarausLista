'use client';

import { useState } from 'react';

// redux
import { toggleConfirmation, toggleModal } from '@/redux/features/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

// framer motion
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

import Image from 'next/image';

// style
import { sorce_sans_3 } from '@/app/utils/fonts';
import classes from './page.module.css';

// icons
import AvatarIcon from '../../../../public/icons/avatar.svg';
import BinIcon from '../../../../public/icons/bin.svg';
import EyeIcon from '../../../../public/icons/eye.svg';
import EyeSlashedIcon from '../../../../public/icons/eye_slashed.svg';
import CopyIcon from '../../../../public/icons/copy.svg';

// components
import CardLayout from '@/app/components/ui/CardLayout';
import Button from '@/app/components/ui/Button';
import Account from '@/app/components/modal/Account';
import ModalLayout from '@/app/components/ui/ModalLayout';

export default function AccountPage() {
  // redux
  const dispatch = useDispatch();


  // for confirmation
  const toggleConfirmationHandler = () => {
    // redux, dispatch
    dispatch(toggleConfirmation());

    console.log('toggled');
  };
  // redux, state value
  const showConfirmation = useSelector(
    (state) => state.uiReducer.value.confirmationIsVisible
  );

  // for layover
  const toggleModalrHandler = () => {
    // redux dispatch
    dispatch(toggleModal());
  };
  // redux, state value
  const showModal = useSelector((state) => state.uiReducer.value.modalIsVisible);

  // state for password state
  const [passwordDisplayState, setPasswordDisplayState] = useState(false);
  const togglePasswordDisplayState = () => {
    setPasswordDisplayState(!passwordDisplayState);
    //console.log(`passwordDisplayState is: ${passwordDisplayState}`);
  };

  // copy to clipboard state
  const [copyState, setCopyState] = useState(false);
  // copy to clipboard function
  const copyToClipboard = (content) => {
    setCopyState(true);
    navigator.clipboard.writeText(content);
    setTimeout(() => {
      setCopyState(false);
    }, 3000);
  };

  return (
    <main>
      <CardLayout>
        <div className={classes.account_header_block}>
          <div className={classes.avatar_block}>
            <Image src={AvatarIcon} alt='avatar icon' width={36} />
          </div>
          <h1 className={sorce_sans_3.className}>Johanna</h1>
        </div>

        <ul className={classes.account__list}>

          <li>
            <p className={classes.field_name}>Address:</p>
            <p className={classes.text_content}>Kulmakatu 47</p>
            <Image
              src={BinIcon}
              alt='bin icon'
              height={15}
              className='img_btn'
              onClick={toggleConfirmationHandler}
            />
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
            <p className={classes.text_content}>
              {passwordDisplayState ? '8ff4cc7a21005' : '*****'}
            </p>
            <Image
              className='img_btn'
              src={passwordDisplayState ? EyeSlashedIcon : EyeIcon}
              alt='eye icon'
              height={18}
              onClick={togglePasswordDisplayState}
            />
          </li>

          <li>
            <p className={classes.field_name}>Invitation link:</p>
            <p className={classes.text_content}>
              4cae2cc2a0017e88ff4cc7a210051a79
            </p>
            <Image
              className='img_btn'
              src={CopyIcon}
              alt='copy icon'
              height={18}
              onClick={() => {
                copyToClipboard('4cae2cc2a0017e88ff4cc7a210051a79');
              }}
            />
            <AnimatePresence>
              {copyState && (
                <motion.div
                  className={classes.ux_feedback}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 100 },
                  }}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                >
                  link is copied
                </motion.div>
              )}
            </AnimatePresence>
          </li>

        </ul>

        <div className={classes.info_block}>
          <p>
            Create account to get access to VarausLista App from multiple
            devices and make reservations faster.
          </p>
        </div>

        <Button name='Create Account' action={toggleModalrHandler} />
      </CardLayout>

      {showModal && <Account toggleLayover={toggleModalrHandler} />}

      {showConfirmation && (
        <ModalLayout toggleLayover={toggleConfirmationHandler}>
          <CardLayout>
            <h1 className={sorce_sans_3.className}>Are you sure?</h1>
            <div className='text_block'>
              <p>
                You are going to delete your address. To return it back you will
                need an invitation link from your neighbours or you will need to
                create a new address.
              </p>
              <p>
                Please confirm deleting address only if you 100% aware of what
                you are doing.
              </p>
            </div>
            <Button name='Confirm deleting address' />
          </CardLayout>
        </ModalLayout>
      )}
    </main>
  );
}
