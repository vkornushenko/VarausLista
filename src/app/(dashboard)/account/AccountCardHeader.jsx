import classes from './AccountCardHeader.module.css';
import AvatarIcon from '../../../../public/icons/avatar.svg';
import { sorce_sans_3 } from '@/app/utils/fonts';
import Image from 'next/image';

export default function AccountCardHeader(props) {
  return (
    <div className={classes.account_header_block}>
      <div className={classes.avatar_block}>
        <Image src={AvatarIcon} alt='avatar icon' width={36} />
      </div>
      <h1 className={sorce_sans_3.className}>{props.name || 'New User'}</h1>
    </div>
  );
}
