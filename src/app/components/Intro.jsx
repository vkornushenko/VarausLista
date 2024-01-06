'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
// fonts
import { sorce_sans_3 } from '@/app/utils/fonts';
// icons
import AccountIcon from '../../../public/icons/Account.svg';
import BuildingIcon from '../../../public/icons/building.svg';
import ShareIcon from '../../../public/icons/share.svg';
// components
//import Button from './ui/Button';
// style
import classes from './Intro.module.css';
import Button from './ui/Button';
import CardHeader from './ui/CardHeader';

export default function Intro() {
  const router = useRouter();

  // button action
  const buttonAction = () => {
    router.push('/account');
  };

  return (
    <>
      <CardHeader title='Join VarausLista App' />

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

      <p className={classes.welcome__paragraph}>
        Thanks for using VarausLista App. Your place is Kulmakatu 47. You can
        make a reservation for your shared property.
      </p>
      <Button action={buttonAction} name={'Get Started'} />
    </>
  );
}
