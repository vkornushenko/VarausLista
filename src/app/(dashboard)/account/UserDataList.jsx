import classes from './UserDataList.module.css';
import Image from 'next/image';
import { useState } from 'react';

// framer motion
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

// icons
import BinIcon from '../../../../public/icons/bin.svg';
import EyeIcon from '../../../../public/icons/eye.svg';
import EyeSlashedIcon from '../../../../public/icons/eye_slashed.svg';
import CopyIcon from '../../../../public/icons/copy.svg';

export default function UserDataList({userData, toggleConfirmationHandler}) {
  // state for password state
  const [passwordDisplayState, setPasswordDisplayState] = useState(false);
  const togglePasswordDisplayState = () => {
    setPasswordDisplayState(!passwordDisplayState);
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

    <ul className={classes.account__list}>
      {userData.address && (
        <li>
          <p className={classes.field_name}>Address:</p>
          <p className={classes.text_content}>{userData.address}</p>
          <Image
            src={BinIcon}
            alt='bin icon'
            height={15}
            className='img_btn'
            onClick={toggleConfirmationHandler}
          />
        </li>
      )}

      {userData.apartment && (
        <li>
          <p className={classes.field_name}>Apartment:</p>
          <p className={classes.text_content}>{userData.apartment}</p>
        </li>
      )}

      {userData.email && (
        <li>
          <p className={classes.field_name}>Email:</p>
          <p className={classes.text_content}>{userData.email}</p>
        </li>
      )}

      {userData.password && (
        <li>
          <p className={classes.field_name}>Password:</p>
          <p className={classes.text_content}>
            {passwordDisplayState ? userData.password : '*****'}
          </p>
          <Image
            className='img_btn'
            src={passwordDisplayState ? EyeSlashedIcon : EyeIcon}
            alt='eye icon'
            height={18}
            onClick={togglePasswordDisplayState}
          />
        </li>
      )}

      {userData.invitationLink && (
        <li>
          <p className={classes.field_name}>Invitation link:</p>
          <p className={classes.text_content}>
            {userData.invitationLink}
          </p>
          <Image
            className='img_btn'
            src={CopyIcon}
            alt='copy icon'
            height={18}
            onClick={() => {
              copyToClipboard(userData.invitationLink);
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
      )}

    </ul>
  );
}
