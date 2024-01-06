import classes from './AccountCardLogin.module.css'
import Link from 'next/link';
import { sorce_sans_3 } from '@/app/utils/fonts';

export default function AccountCardLogin() {
  return (
    <div className={classes.login_container}>
      <p className={sorce_sans_3.className}>Already a user?</p>
      <Link href='/login' className={sorce_sans_3.className}>
        LogIn
      </Link>
    </div>
  );
}
