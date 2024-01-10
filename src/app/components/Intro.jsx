'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Image from 'next/image';
// icons
import AccountIcon from '../../../public/icons/account.svg';
import BuildingIcon from '../../../public/icons/building.svg';
import ShareIcon from '../../../public/icons/share.svg';
// components
//import Button from './ui/Button';
// style
import classes from './Intro.module.css';
import Button from './ui/Button';
import CardHeader from './ui/CardHeader';

export default function Intro() {
  // selector for userData from the Store
  const userData = useSelector((state) => state.userReducer);

  const router = useRouter();

  // button action
  const buttonAction = () => {
    router.push(userData.address ? '/reservation' : '/account');
  };

  return (
    <>
      <CardHeader
        title={
          userData.name ? `Hello ${userData.name}` : 'Join VarausLista App'
        }
      />

      {!userData.email && (
        <ul className={classes.welcome__list}>
          <li>
            <Image src={AccountIcon} alt='VarausLista logo' height={18} />
            <p>Create VarausLista account</p>
          </li>
          <li>
            <Image src={BuildingIcon} alt='VarausLista logo' height={18} />
            <p>Add address and shared property</p>
          </li>
          <li>
            <Image src={ShareIcon} alt='VarausLista logo' height={18} />
            <p>Share invitation link with neighbours</p>
          </li>
        </ul>
      )}
      {userData.email && (
        <p className={classes.welcome__paragraph}>
          Thanks for using VarausLista App.{' '}
          {userData.address && `Your place is ${userData.address}. `}You can
          make a reservation for your shared property.
        </p>
      )}
      <Button action={buttonAction} name={userData.address ? 'Check Reservations' : 'Get Started'} />
    </>
  );
}
