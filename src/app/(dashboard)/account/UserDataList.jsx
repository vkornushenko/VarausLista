import classes from './UserDataList.module.css';
import '@/app/globals.css';

import Image from 'next/image';
import { useState } from 'react';

// framer motion
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

// icons
import EyeIcon from '../../../../public/icons/eye.svg';
import EyeSlashedIcon from '../../../../public/icons/eye_slashed.svg';
import CopyIcon from '../../../../public/icons/copy.svg';
import { IoSettingsOutline } from 'react-icons/io5';
import Link from 'next/link';

export default function UserDataList({ userData }) {
  // state for password state
  const [passwordDisplayState, setPasswordDisplayState] = useState(false);
  // const togglePasswordDisplayState = () => {
  //   setPasswordDisplayState(!passwordDisplayState);
  // };

  // copy to clipboard state
  const [copyUserIdState, setCopyUserIdState] = useState(false);
  const [copyEmailState, setCopyEmailState] = useState(false)
  // copy to clipboard function
  const copyToClipboard = (content, action) => {
    action(true);
    navigator.clipboard.writeText(content);
    setTimeout(() => {
      action(false);
    }, 3000);
  };

  return (
    <ul className={classes.account__list}>
      {userData.address && (
        <li>
          <p className={classes.field_name}>Address:</p>
          <p className={classes.text_content}>{userData.address}</p>
          {/* <Link href='/'>Liny<IoSettingsOutline /></Link> */}
          {/* <Image
            src={BinIcon}
            alt='bin icon'
            height={15}
            className='img_btn'
            onClick={toggleConfirmationHandler}
          /> */}
          {/* not to let icon stretch li element icon size 28 li height 39 (22+8+8) overflow hidden */}
          <Link href='/address' className='link_icons'>
          <IoSettingsOutline width={48}/>
          </Link>
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
          <Image
            className='img_btn'
            src={CopyIcon}
            alt='copy icon'
            height={18}
            onClick={() => {
              copyToClipboard(userData.email, setCopyEmailState);
            }}
          />
          <AnimatePresence>
            {copyEmailState && (
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
                Email is copied
              </motion.div>
            )}
          </AnimatePresence>
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
            onClick={() => {setPasswordDisplayState((prevState) => !prevState)}}
          />
        </li>
      )}

      {/* {userData.invitationLink && (
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
            {copyUserIdState && (
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
      )} */}

      {userData.user_id && (
        <li>
          <p className={classes.field_name}>User Id:</p>
          <p className={classes.text_content}>{userData.user_id}</p>
          <Image
            className='img_btn'
            src={CopyIcon}
            alt='copy icon'
            height={18}
            onClick={() => {
              copyToClipboard(userData.user_id, setCopyUserIdState);
            }}
          />
          <AnimatePresence>
            {copyUserIdState && (
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
                User Id is copied
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      )}
    </ul>
  );
}
