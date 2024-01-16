import { sorce_sans_3 } from '@/app/utils/fonts';
import Image from 'next/image';
import LocationIcon from '../../../../public/icons/location.svg';
import classes from './page.module.css';

export default function ReservationCardHeader({address}) {
  return (
    <div className={classes.reservation__header_block}>
      <Image src={LocationIcon} alt='location icon' height={20} />
      <h1 className={sorce_sans_3.className}>{address || 'No address found'}</h1>
    </div>
  );
}
