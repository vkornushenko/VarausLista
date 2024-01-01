'use client';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '@/lib/ui_slice';

// framer motion
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

import Image from 'next/image';
import { useEffect, useState } from 'react';

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

// async function getUser(id){
//   const res = await fetch('http://localhost:4001/users/' + id, {
//     next: {
//       revalidate: 60,
//     },
//   });

//   if (!res.ok) {
//     // notFound();
//     //console.log('error, res not ok')
//   }
//   return res.json();
// }

export default function AccountPage() {
  const [user, setUser] = useState();

  const userId = 3;
  useEffect(() => {
    const getUser = async (id) => {
      const response = await fetch('http://localhost:4001/users/' + id);
      const resData = await response.json();
      setUser(resData);
    };
    getUser(userId);
  }, [userId]);

  // redux
  const dispatch = useDispatch();
  // for confirmation
  const toggleConfirmationHandler = () => {
    dispatch(uiActions.toggleConfirmation());
    console.log('toggled');
  };
  const showConfirmation = useSelector(
    (state) => state.ui.confirmationIsVisible
  );
  // for layover
  const toggleModalrHandler = () => {
    dispatch(uiActions.toggleModal());
  };
  const showModal = useSelector((state) => state.ui.modalIsVisible);

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
          <h1 className={sorce_sans_3.className}>{user && user.first_name || 'New User'}</h1>
        </div>

        <ul className={classes.account__list}>
          <li>
            <p className={classes.field_name}>Address:</p>
            <p className={classes.text_content}>{user && user.address || ''}</p>
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
            <p className={classes.text_content}>{user && user.apartment || ''}</p>
          </li>
          <li>
            <p className={classes.field_name}>Email:</p>
            <p className={classes.text_content}>{user && user.email || ''}</p>
          </li>
          <li>
            <p className={classes.field_name}>Password:</p>
            <p className={classes.text_content}>
              {passwordDisplayState ? user && user.password || '' : '*****'}
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
